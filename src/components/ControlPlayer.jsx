import React from "react";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import NextIcon from "./icons/NextIcon";
import PrevIcon from "./icons/PrevIcon";

const ControlPlayer = ({ togglePlayPause, currentAudio }) => {
  return (
    <>
      <button>
        <PrevIcon />
      </button>
      <button onClick={togglePlayPause}>
        {currentAudio.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button>
        <NextIcon />
      </button>
    </>
  );
};

export default ControlPlayer;
