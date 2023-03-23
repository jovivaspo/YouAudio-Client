import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import {
  onConverter,
  onLoadAudio,
  onLoadInfo,
  onReset,
} from "../store/player/playerSlice";
import { useContext } from "react";
import { Globalcontext } from "../contexts/GlobalContext";
import {
  deleteFile,
  getAllFiles,
  getFile,
  updateDataBase,
} from "../helpers/indexDB";

export const usePlayer = () => {
  const { status, currentAudio } = useSelector((state) => state.player);
  const { setAlert, setLoading } = useContext(Globalcontext);
  const dispatch = useDispatch();

  const loadAudio = async ({ id }) => {
    try {
      dispatch(onConverter());
      localStorage.setItem("status-audio", "converting");

      //LLamada a la api
      const response = await api.get(`/video/${id}`, {
        responseType: "blob",
      });
      const blob = await response.data;

      // almacenar el archivo en IndexedDB
      await updateDataBase(blob, id);

      const file = blob;

      const url = URL.createObjectURL(file);

      dispatch(onLoadAudio({ url }));
      localStorage.setItem(
        "currentAudio",
        JSON.stringify({ ...currentAudio, url })
      );

      localStorage.setItem("status-audio", "ready");

      //Borramos cualquier archivo que no sea el currentAudio
      const keys = await getAllFiles();

      const filesToDelete = keys.filter((key) => id !== key);

      if (filesToDelete.length > 0) {
        await Promise.all(
          filesToDelete.map(async (el) => await deleteFile(el))
        );
      }
    } catch (error) {
      console.log(error);
      setAlert("Lo sentimos, algo salió mal...");
    }
  };

  const resetAudio = async ({ id }) => {
    try {
      const file = await getFile(id);
      if (file) {
        await deleteFile(id);
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
