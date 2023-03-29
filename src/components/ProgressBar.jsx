import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { onSeek } from "../store/player/playerSlice";

const ProgressBar = ({ currentAudio }) => {
  const progressBar = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    progressBar.current.max = currentAudio?.duration;
  }, [currentAudio?.duration]);

  useEffect(() => {
    progressBar.current.value = currentAudio.currentTime;
    changePlayerCurrentTime();
  }, [currentAudio?.currentTime]);

  const changeRange = () => {
    dispatch(
      onSeek({
        seek: progressBar.current.value,
      })
    );
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / currentAudio.duration) * 100}%`
    );
    localStorage.setItem(
      "currentAudio",
      JSON.stringify({
        ...currentAudio,
        currentTime: progressBar.current.value,
      })
    );
  };

  return (
    <input
      type="range"
      className="w-3/4 bg-gray-500 cursor-pointer rounded-full h-1"
      ref={progressBar}
      onChange={changeRange}
    />
  );
};

export default ProgressBar;
