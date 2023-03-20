import { useDispatch, useSelector } from "react-redux";
import { openDB } from "idb";
import api from "../api/api";
import { onConverter, onReady } from "../store/player/playerSlice";

export const usePlayer = () => {
  const { status, audio } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const loadAudio = async ({ id }) => {
    dispatch(onConverter());

    const dbName = "YouAudioDB";
    const dbVersion = 1;
    const storeName = "myAudioStore";
    const key = id;

    // abrir la base de datos
    const db = await openDB(dbName, dbVersion, {
      upgrade(db) {
        db.createObjectStore(storeName);
      },
    });

    let file = await db.get(storeName, key);

    if (!file) {
      console.log("El archivo no están en la DB");

      try {
        const response = await api.get(`/video/${id}`, {
          responseType: "blob",
        });
        const blob = await response.data;

        // almacenar el archivo en IndexedDB
        await db.put(storeName, blob, key);

        file = blob;
      } catch (error) {
        console.log(error);
      }
    }

    const url = URL.createObjectURL(file);
    dispatch(onReady({ url }));
  };

  return {
    status,
    audio,

    loadAudio,
  };
};
