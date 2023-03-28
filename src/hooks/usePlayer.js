import { useDispatch, useSelector } from "react-redux";
import api from "../api/api";
import {
  onConverter,
  onLoadAudio,
  onLoadInfo,
  onReset,
  onPlaying,
  onSaving,
  onSaved,
  onLoading,
  onResetUrl,
} from "../store/player/playerSlice";
import { useContext, useEffect } from "react";
import { Globalcontext } from "../contexts/GlobalContext";
import {
  deleteFile,
  getAllFiles,
  getFile,
  updateDataBase,
} from "../helpers/indexDB";

export const usePlayer = () => {
  const { status, currentAudio, playlist } = useSelector((state) => state.player);
  const { setAlert, setLoading } = useContext(Globalcontext);
  const dispatch = useDispatch();

  const resetAudio = async ({ id }) => {
    console.log("reset");
    dispatch(onReset());
    localStorage.removeItem("currentAudio");
    localStorage.removeItem("status-audio");
  };

  const loadInfo = async ({ id }) => {
    try {
      console.log("Se carga la información");
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

  const savingAudio = async ({ id }) => {
    try {
      //Vemos si elemento ya existe en la base de datos
      console.log("¿Guardando?");
      const file = await getFile(id);
      if (file) {
        dispatch(onSaved());
        localStorage.setItem("status-audio", "saved");
        return false;
      }
      console.log("por aquí está pasando por que el archivo no estaba");
      dispatch(onConverter());
      localStorage.setItem("status-audio", "converting");

      //LLamada a la api
      const response = await api.get(`/video/${id}`, {
        responseType: "blob",
      });
      const blob = await response.data;

      dispatch(onSaving());

      const res = await updateDataBase(blob, id);

      if (res.error) return setAlert("Error al guardar el archivo");

      dispatch(onSaved());

      localStorage.setItem("status-audio", "saved");

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

  const loadAudio = async ({ id }) => {
    try {
      console.log("Cargando audio");

      dispatch(onLoading());

      const res = await getFile(currentAudio.id);

      if (res.error) return setAlert(res.error);

      const audioUrl = URL.createObjectURL(res);

      dispatch(onLoadAudio({ url: audioUrl }));

      localStorage.setItem(
        "currentAudio",
        JSON.stringify({
          ...currentAudio,
          url: audioUrl,
        })
      );

      localStorage.setItem("status-audio", "ready");
    } catch (error) {
      console.log(error);

      setAlert("Lo sentimos, algo salió mal");
    }
  };

  const resetUrl = async () => {
    console.log("reset url");

    dispatch(onResetUrl());

    localStorage.setItem(
      "currentAudio",
      JSON.stringify({
        ...currentAudio,
        url: null,
        isPlaying: false,
      })
    );

    localStorage.setItem("status-audio", "new-url");
  };

  const togglePlayPause = () => {
    const prevValue = currentAudio.isPlaying;
    dispatch(onPlaying({ isPlaying: !prevValue }));
  };


  return {
    status,
    currentAudio,
    playlist,

    savingAudio,
    loadAudio,
    resetAudio,
    loadInfo,
    resetUrl,

    togglePlayPause,
  };
};
