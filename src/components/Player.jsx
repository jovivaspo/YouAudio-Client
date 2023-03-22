import NextIcon from "./icons/NextIcon";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import PrevIcon from "./icons/PrevIcon";
import { useEffect, useRef } from "react";
import { calculateTime } from "../helpers/calculateTime";
import { useDispatch } from "react-redux";
import {
  onCurrentTime,
  onDuration,
  onPlaying,
} from "../store/player/playerSlice";
import { useNavigate } from "react-router-dom";

const Player = ({ currentAudio }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    const controlEnd = () => {
      dispatch(onPlaying({ isPlaying: false }));
      setTimeout(() => {
        handlerNext();
      }, [2500]);
    };
    if (audioPlayer.current && progressBar.current) {
      audioPlayer.current.addEventListener("loadedmetadata", () => {
        const seconds = Math.floor(audioPlayer.current.duration);

        dispatch(onDuration({ duration: seconds }));
        localStorage.setItem(
          "currentAudio",
          JSON.stringify({ ...currentAudio, duration: seconds })
        );
        progressBar.current.max = seconds || 0;

        audioPlayer.current.currentTime = currentAudio.currentTime;
        progressBar.current.value = audioPlayer.current.currentTime;

        progressBar.current.style.setProperty(
          "--seek-before-width",
          `${(currentAudio.currentTime / seconds) * 100}%`
        );
      });

      audioPlayer.current.addEventListener("ended", controlEnd);
    }
  }, []);

  useEffect(() => {
    if (audioPlayer.current) {
      if (currentAudio.isPlaying) {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [currentAudio?.isPlaying]);

  const handlerNext = () => {
    navigate(`/video/${currentAudio.videosRelated[0].id}`);
  };

  const togglePlayPause = () => {
    console.log("toggle");
    const prevValue = currentAudio.isPlaying;
    localStorage.setItem(
      "currentAudio",
      JSON.stringify({ ...currentAudio, isPlaying: !prevValue })
    );
    dispatch(onPlaying({ isPlaying: !prevValue }));
  };

  const whilePlaying = () => {
    if (progressBar.current && audioPlayer.current) {
      progressBar.current.value = audioPlayer.current.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRange = () => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = progressBar.current.value;
      changePlayerCurrentTime();
    }
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / currentAudio.duration) * 100}%`
    );
    dispatch(onCurrentTime({ currentTime: progressBar.current.value }));
    localStorage.setItem(
      "currentAudio",
      JSON.stringify({
        ...currentAudio,
        currentTime: progressBar.current.value,
      })
    );
  };

  return (
    <>
      <audio ref={audioPlayer} src={currentAudio.url} preload="auto" />
      <input
        type="range"
        className=" absolute bottom-10 w-full cursor-pointer z-30"
        ref={progressBar}
        onChange={changeRange}
      />
      <div className="absolute bottom-0 left-0 flex gap-6 items-center pl-4 w-full h-11 bg-black opacity-10  z-30"></div>
      <div className="absolute bottom-0 left-0 flex gap-6 items-center pl-4 w-full h-10 z-30">
        <button>
          <PrevIcon />
        </button>
        <button onClick={togglePlayPause}>
          {currentAudio.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button onClick={handlerNext}>
          <NextIcon />
        </button>
        <div className="flex gap-2">
          <span className="currentTime">
            {calculateTime(currentAudio.currentTime)}
          </span>
          <span>/</span>
          {currentAudio.duration && (
            <span className="duration">
              {calculateTime(currentAudio.duration)}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
