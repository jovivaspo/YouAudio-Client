import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { usePlayer } from "../hooks/usePlayer";
import {
  onCurrentTime,
  onDuration,
  onSeek,
  onPlaying,
} from "../store/player/playerSlice";

const Audio = () => {
  const audioPlayer = useRef();
  const dispatch = useDispatch();
  const { loadAudio, currentAudio, status } = usePlayer();

  useEffect(() => {
    if (status !== "saved" && status !== "new-url") return;
    loadAudio({ id: currentAudio.id });
  }, [status]);

  useEffect(() => {
    if (status !== "ready" && audioPlayer.current) return;
    audioPlayer.current.src = currentAudio.url;
  }, [currentAudio.url]);

  useEffect(() => {
    if (!audioPlayer.current && status !== "ready") return;
    currentAudio.isPlaying
      ? audioPlayer.current.play()
      : audioPlayer.current.pause();
    localStorage.setItem(
      "currentAudio",
      JSON.stringify({ ...currentAudio, isPlaying: currentAudio.isPlaying })
    );
  }, [currentAudio?.isPlaying, audioPlayer?.current]);

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
    //  dispatch(onPlaying({ isPlaying: true }));
  };

  useEffect(() => {
    if (currentAudio.seek === 0) return;
    audioPlayer.current.currentTime = currentAudio.seek;
    dispatch(onSeek({ seek: 0 }));
  }, [currentAudio?.seek]);

  return (
    <>
      <audio
        ref={audioPlayer}
        preload="auto"
        type="audio/mpeg"
        onLoadedMetadata={setDuration}
        onLoadedData={onLoad}
        onTimeUpdate={onTimeUpdate}
      ></audio>
    </>
  );
};

export default Audio;

/**  onPlay={() => dispatch(onPlaying({ isPlaying: true }))}
      onPause={() => dispatch(onPlaying({ isPlaying: false }))} */
