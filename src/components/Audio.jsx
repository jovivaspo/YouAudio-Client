import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { usePlayer } from "../hooks/usePlayer";
import { onCurrentTime, onDuration, onPlaying, onSeek } from "../store/player/playerSlice";

const Audio = () => {
  const audioPlayer = useRef();
  const dispatch = useDispatch();
  const { currentAudio, status, loadAudio, savingAudio, loadInfo, resetUrl, handlerNext } =
    usePlayer();

  //Verificamos que existe la url existente
  useEffect(()=>{
    if(!currentAudio.url) return 
    fetch(currentAudio.url)
    .catch(err=>{
      console.log(err)
      resetUrl();
    })
  },[])

  //Verificando el estado
  useEffect(() => {
    const checkingStatus = {
      ["starting-audio"]: () => loadInfo({ id: currentAudio.next }),
      ["info-loaded"]: () => savingAudio({ id: currentAudio.id }),
      ["audio-saved"]: () => loadAudio({ id: currentAudio.id }),
      ["reset-url"]: () => loadAudio({ id: currentAudio.id }),
    };
    checkingStatus[status] ? checkingStatus[status]() : null;
  }, [status]);

  //Añadir url al reproductor
  useEffect(() => {
    if (status !== "audio-ready" && audioPlayer.current) return;
    audioPlayer.current.src = currentAudio.url;
  }, [currentAudio.url]);

  //Controlar el play/pause
  useEffect(() => {
    if (!audioPlayer.current && status !== "audio-ready") return;
    if(currentAudio.isPlaying){
      const startPlay = audioPlayer.current.play().catch((error)=>{
        dispatch(onPlaying({isPlaying:false}))
      })
      
    }else{
      audioPlayer.current.pause();
    }
      
    localStorage.setItem(
      "currentAudio",
      JSON.stringify({ ...currentAudio, isPlaying: currentAudio.isPlaying })
    );
  }, [currentAudio?.isPlaying, audioPlayer?.current]);

  //Controlar avance de la barra de progreso
  useEffect(() => {
    if (currentAudio.seek === 0) return;
    audioPlayer.current.currentTime = currentAudio.seek;
    dispatch(onSeek({ seek: 0 }));
  }, [currentAudio?.seek]);

  const setDuration = () => {
    let seconds = audioPlayer.current.duration;
    seconds = Math.floor(seconds);
    dispatch(onDuration({ duration: seconds }));
    localStorage.setItem(
      "currentAudio",
      JSON.stringify({ ...currentAudio, duration: seconds })
    );
  };

  const onTimeUpdate = () => {
    if (audioPlayer?.current?.currentTime === 0) return;
    dispatch(
      onCurrentTime({
        currentTime: Math.floor(audioPlayer?.current?.currentTime),
      })
    );
  };

  const onLoad = () => {
    audioPlayer.current.currentTime = currentAudio.currentTime;
  };

  const onError = (error) => {
    console.log("Ocurrió un error", error);
    dispatch(onPlaying({isPlaying:false}))
    resetUrl();
  };

  const onEnded = () => {
    dispatch(onPlaying({isPlaying:false}))
    handlerNext()
  } 


  return (
    <>
      <audio
        ref={audioPlayer}
        preload="auto"
        type="audio/mpeg"
        onLoadedMetadata={setDuration}
        onLoadedData={onLoad}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onError={onError}
      ></audio>
    </>
  );
};

export default Audio;
