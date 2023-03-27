import React from "react";
import { calculateTime } from "../helpers/calculateTime";

const TimeLinePlayer = ({ currentAudio }) => {
  return (
    <>
      <span className="currentTime text-sm sm:text-base">
        {calculateTime(currentAudio.currentTime)}
      </span>
      <span>/</span>
      {currentAudio.duration && (
        <span className="duration text-sm sm:text-base">
          {calculateTime(currentAudio.duration)}
        </span>
      )}
    </>
  );
};

export default TimeLinePlayer;
