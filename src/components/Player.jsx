import NextIcon from "./icons/NextIcon";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import PrevIcon from "./icons/PrevIcon";
import { useEffect, useState, useRef } from "react";
import { openDB } from "idb";
import api from "../api/api";
import { calculateTime } from "../helpers/calculateTime";

const Player = ({ id }) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    async function fetchAudio() {
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

      // intentar obtener el archivo de audio de IndexedDB
      let file = await db.get(storeName, key);

      // si el archivo no está en IndexedDB, obtenerlo del servidor
      if (!file) {
        console.log("El archivo no están en la DB");

        try {
          const response = await api.get(`/video/${id}`, {
            responseType: "blob",
          });
          const blob = await response.data;

          // almacenar el archivo en IndexedDB
          await db.put(storeName, blob, key);

          console.log("Archivo guardado");

          file = blob;
        } catch (error) {
          console.error(error);
        }
      }

      const url = URL.createObjectURL(file);
      setAudio(url);
    }

    fetchAudio();
  }, []);

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.addEventListener("loadedmetadata", () => {
        const seconds = Math.floor(audioPlayer.current.duration);
        setDuration(seconds);
        progressBar.current.max = seconds;
      });
    }
  }, [audio]);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    console.log(progressBar.current.value);
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };

  if (!audio) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <audio ref={audioPlayer} src={audio} preload="auto" />
      <input
        type="range"
        defaultValue="0"
        max="100"
        className=" absolute bottom-10 w-full cursor-pointer"
        ref={progressBar}
        onChange={changeRange}
      />
      <div className="absolute bottom-2 left-4 flex gap-6">
        <button>
          <PrevIcon />
        </button>
        <button onClick={togglePlayPause}>
          {audioPlayer?.current?.paused ? <PlayIcon /> : <PauseIcon />}
        </button>
        <button>
          <NextIcon />
        </button>
        <div className="flex gap-2">
          <span className="currentTime">{calculateTime(currentTime)}</span>
          <span>/</span>
          {duration > 0 && (
            <span className="duration">{calculateTime(duration)}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
