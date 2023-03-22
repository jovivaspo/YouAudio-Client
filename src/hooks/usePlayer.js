import { useDispatch, useSelector } from "react-redux";
import { openDB } from "idb";
import api from "../api/api";
import {
  onConverter,
  onLoadAudio,
  onLoadInfo,
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
  const { status, currentAudio } = useSelector((state) => state.player);
  const { setAlert, setLoading } = useContext(Globalcontext);
  const dispatch = useDispatch();

  const loadAudio = async ({ id }) => {
    try {
      dispatch(onConverter());
      localStorage.setItem("status-audio", "converting");

      // abrir la base de datos
      const db = await openDB(database.dbName, database.dbVersion, {
        upgrade(db) {
          db.createObjectStore(database.storeName);
        },
      });

      //LLamada a la api
      const response = await api.get(`/video/${id}`, {
        responseType: "blob",
      });
      const blob = await response.data;

      // almacenar el archivo en IndexedDB
      await db.put(database.storeName, blob, id);

      const file = blob;

      const url = URL.createObjectURL(file);

      dispatch(onLoadAudio({ url }));
      localStorage.setItem(
        "currentAudio",
        JSON.stringify({ ...currentAudio, url })
      );
      localStorage.setItem("status-audio", "ready");

      //Borramos el archivo anterior
    } catch (error) {
      console.log(error);
      setAlert("Lo sentimos, algo salió mal...");
    }
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
      localStorage.removeItem("currentAudio");
      localStorage.removeItem("status-audio");
    } catch (error) {
      console.log(error);
      setAlert(error.response.data.error || "Lo sentimos, algo salió mal");
    }
  };

  const loadInfo = async ({ id }) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/video/info/${id}`);
      dispatch(
        onLoadInfo({
          id,
          info: data.videoDetails,
          videosRelated: data.relatedVideos,
        })
      );
      localStorage.setItem(
        "currentAudio",
        JSON.stringify({
          ...currentAudio,
          info: data.videoDetails,
          videosRelated: data.relatedVideos,
        })
      );
      localStorage.setItem("status-audio", "new-item-selected");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAlert(error.response.data.error || "Lo sentimos, algo salió mal");
    }
  };

  return {
    status,
    currentAudio,

    loadAudio,
    resetAudio,
    loadInfo,
  };
};
