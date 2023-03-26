import React from "react";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import NextIcon from "./icons/NextIcon";
import PrevIcon from "./icons/PrevIcon";

const ControlPlayer = ({ togglePlayPause, currentAudio }) => {
  return (
    <div className="absolute bottom-0 left-0 flex gap-6 items-center pl-4 w-44 h-10 z-30">
      <button>
        <PrevIcon />
      </button>
      <button onClick={togglePlayPause}>
        {currentAudio.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button>
        <NextIcon />
      </button>
    </div>
  );
};

export default ControlPlayer;
