import React from "react";
import { calculateTime } from "../helpers/calculateTime";

const TimeLinePlayer = ({ currentAudio }) => {
  return (
    <div className="absolute bottom-0 left-44 h-10 flex items-center gap-2">
      <span className="currentTime">
        {calculateTime(currentAudio.currentTime)}
      </span>
      <span>/</span>
      {currentAudio.duration && (
        <span className="duration">{calculateTime(currentAudio.duration)}</span>
      )}
    </div>
  );
};

export default TimeLinePlayer;
