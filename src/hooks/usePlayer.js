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
  onNextAudio,
} from "../store/player/playerSlice";
import { useContext } from "react";
import { Globalcontext } from "../contexts/GlobalContext";
import {
  deleteFile,
  getAllFiles,
  getFile,
  updateDataBase,
} from "../helpers/indexDB";
import { useLocation, useNavigate } from "react-router-dom";

export const usePlayer = () => {
  const { status, currentAudio, playlist } = useSelector(
    (state) => state.player
  );
  const { setAlert, setLoading } = useContext(Globalcontext);
  const dispatch = useDispatch();
  const location = useLocation()
  const navigate = useNavigate()

  const startAudio = async ({ id }) => {
    console.log("Nuevo audio");
    setLoading(true);
    dispatch(onNextAudio({ id }));
    localStorage.setItem(
      "currentAudio",
      JSON.stringify({
        url: null,
        id: null,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        seek: 0,
        info: null,
        next: id,
      })
    );
    localStorage.setItem("status-audio", "starting-audio");
    setLoading(false);
  };

  const resetAudio = async () => {
    console.log("reset");
    dispatch(onReset());
    localStorage.removeItem("playlist");
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
          next: null,
          info: data.videoDetails,
          videosRelated: data.relatedVideos,
        })
      );
      localStorage.setItem("status-audio", "info-loaded");
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
        localStorage.setItem("status-audio", "audio-saved");
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

      localStorage.setItem("status-audio", "audio-saved");

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
          isPlaying:true,
          url: audioUrl,
        })
      );

      localStorage.setItem("status-audio", "audio-ready");
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

    localStorage.setItem("status-audio", "reset-url");
  };

  const togglePlayPause = () => {
    const prevValue = currentAudio.isPlaying;
    dispatch(onPlaying({ isPlaying: !prevValue }));
  };

  const handlerNext = () => {
    let next = "";
    if (playlist.id) {
      const indexInPlay = playlist.items.findIndex(
        (el) => currentAudio.id === el.id
      );
      if (indexInPlay === playlist.items.length - 1) {
        next = playlist.items[0].id;
        startAudio({ id: next });
      } else {
        next = playlist.items[indexInPlay + 1].id;
        startAudio({ id: next });
      }
    } else {
      next = currentAudio.videosRelated[0].id;
      startAudio({ id: next });
    }

    if (location.pathname.includes("/video/")) {
      navigate(`/video/${next}`);
    }
  };

  const handlerPrev = () => {
    let next = "";
    if (playlist.id) {
      const indexInPlay = playlist.items.findIndex(
        (el) => currentAudio.id === el.id
      );
      if (indexInPlay === 0) {
        next = playlist.items[playlist.items.length - 1].id;
        startAudio({ id: next });
      } else {
        next = playlist.items[indexInPlay - 1].id;
        startAudio({ id: next });
      }
    } else {
      next =
        currentAudio.videosRelated[currentAudio.videosRelated.length - 1].id;
      startAudio({
        id: next,
      });
    }

    if (location.pathname.includes("/video/")) {
      navigate(`/video/${next}`);
    }
  };


  return {
    status,
    currentAudio,
    playlist,

    startAudio,
    savingAudio,
    loadAudio,
    resetAudio,
    loadInfo,
    resetUrl,

    togglePlayPause,
    handlerNext,
    handlerPrev
  };
};
