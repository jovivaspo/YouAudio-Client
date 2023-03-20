import { useDispatch, useSelector } from "react-redux";
import { openDB } from "idb";
import api from "../api/api";
import {
  onConverter,
  onLoadInfo,
  onReady,
  onReset,
} from "../store/player/playerSlice";
import { useContext } from "react";
import { Globalcontext } from "../contexts/GlobalContext";

const database = {
  dbName: "YouAudioDB",
  dbVersion: 1,
  storeName: "myAudioStore",
};

export const usePlayer = () => {
  const { status, audio } = useSelector((state) => state.player);
  const { setAlert, setLoading } = useContext(Globalcontext);
  const dispatch = useDispatch();

  const loadAudio = async ({ id }) => {
    dispatch(onConverter());

    // abrir la base de datos
    const db = await openDB(database.dbName, database.dbVersion, {
      upgrade(db) {
        db.createObjectStore(database.storeName);
      },
    });

    let file = await db.get(database.storeName, id);

    if (!file) {
      try {
        const response = await api.get(`/video/${id}`, {
          responseType: "blob",
        });
        const blob = await response.data;

        // almacenar el archivo en IndexedDB
        await db.put(database.storeName, blob, id);

        file = blob;
      } catch (error) {
        console.log(error);
        setAlert(error.response.data.error);
      }
    }

    const url = URL.createObjectURL(file);
    dispatch(onReady({ url, id }));
    localStorage.setItem("audio", JSON.stringify({ ...audio, url, id }));
  };

  const resetAudio = async ({ id }) => {
    // abrir la base de datos
    try {
      const db = await openDB(database.dbName, database.dbVersion, {
        upgrade(db) {
          db.createObjectStore(database.storeName);
        },
      });
      //Buscar el archivo
      let file = await db.get(database.storeName, id);
      if (file) {
        await db.delete(database.storeName, id);
      }
      dispatch(onReset());
      localStorage.removeItem("audio");
    } catch (error) {
      console.log(error);
    }
  };

  const loadInfo = async ({ id }) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/video/info/${id}`);
      dispatch(
        onLoadInfo({
          info: data.videoDetails,
          videosRelated: data.relatedVideos,
        })
      );
      localStorage.setItem(
        "audio",
        JSON.stringify({
          ...audio,
          info: data.videoDetails,
          videosRelated: data.relatedVideos,
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAlert(error.response.data.error);
    }
  };

  return {
    status,
    audio,

    loadAudio,
    resetAudio,
    loadInfo,
  };
};
