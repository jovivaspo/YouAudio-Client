import NextIcon from "./icons/NextIcon";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import PrevIcon from "./icons/PrevIcon";
import { useEffect, useState, useRef } from "react";
import { calculateTime } from "../helpers/calculateTime";
import { usePlayer } from "../hooks/usePlayer";
import { useDispatch } from "react-redux";
import {
  onCurrentTime,
  onDuration,
  onPlaying,
} from "../store/player/playerSlice";
import { useNavigate } from "react-router-dom";

const Player = () => {
  const { audio } = usePlayer();

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
          "audio",
          JSON.stringify({ ...audio, duration: seconds })
        );
        progressBar.current.max = seconds || 0;

        audioPlayer.current.currentTime = audio.currentTime;
        progressBar.current.value = audioPlayer.current.currentTime;

        progressBar.current.style.setProperty(
          "--seek-before-width",
          `${(audio.currentTime / seconds) * 100}%`
        );
      });

      audioPlayer.current.addEventListener("ended", controlEnd);
    }
  }, []);

  useEffect(() => {
    if (audioPlayer.current) {
      if (audio.isPlaying) {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [audio?.isPlaying]);

  const handlerNext = () => {
    navigate(`/video/${audio.videosRelated[0].id}`);
  };

  const togglePlayPause = () => {
    const prevValue = audio.isPlaying;
    dispatch(onPlaying({ isPlaying: !prevValue }));
    localStorage.setItem(
      "audio",
      JSON.stringify({ ...audio, isPlaying: !prevValue })
    );
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
      `${(progressBar.current.value / audio.duration) * 100}%`
    );
    dispatch(onCurrentTime({ currentTime: progressBar.current.value }));
    localStorage.setItem(
      "audio",
      JSON.stringify({ ...audio, currentTime: progressBar.current.value })
    );
  };

  return (
    <>
      <audio ref={audioPlayer} src={audio.url} preload="auto" />
      <input
        type="range"
        className=" absolute bottom-10 w-full cursor-pointer z-30"
        ref={progressBar}
        onChange={changeRange}
      />
      <div className="absolute bottom-0 left-0 flex gap-6 items-center pl-4 w-full h-11 bg-black opacity-10"></div>
      <div className="absolute bottom-0 left-0 flex gap-6 items-center pl-4 w-full h-10 z-30">
        <button>
          <PrevIcon />
        </button>
        <button onClick={togglePlayPause}>
          {audio.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button onClick={handlerNext}>
          <NextIcon />
        </button>
        <div className="flex gap-2">
          <span className="currentTime">
            {calculateTime(audio.currentTime)}
          </span>
          <span>/</span>
          {audio.duration && (
            <span className="duration">{calculateTime(audio.duration)}</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Player;
