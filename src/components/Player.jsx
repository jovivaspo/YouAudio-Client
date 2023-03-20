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

const Player = ({ id }) => {
  const { status, audio, loadAudio, resetAudio } = usePlayer();

  const dispatch = useDispatch();

  // references
  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  useEffect(() => {
    if (audio && id !== audio.id) {
      resetAudio({ id: audio.id });
    }

    loadAudio({ id });
  }, [id]);

  useEffect(() => {
    if (audioPlayer.current && audio) {
      audioPlayer.current.addEventListener("loadedmetadata", () => {
        const seconds = Math.floor(audioPlayer.current.duration);
        dispatch(onDuration({ duration: seconds }));
        progressBar.current.max = seconds;
      });
    }
  }, [audio]);

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

  const togglePlayPause = () => {
    const prevValue = audio.isPlaying;
    dispatch(onPlaying({ isPlaying: !prevValue }));
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
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
  };

  if (status !== "ready") {
    return <></>;
  }

  return (
    <>
      <audio ref={audioPlayer} src={audio.url} preload="auto" />
      <input
        type="range"
        defaultValue="0"
        max="100"
        className=" absolute bottom-10 w-full cursor-pointer"
        ref={progressBar}
        onChange={changeRange}
      />
      <div className="absolute bottom-2 left-4 flex gap-6 items-center">
        <button>
          <PrevIcon />
        </button>
        <button onClick={togglePlayPause}>
          {audio.isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button>
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
