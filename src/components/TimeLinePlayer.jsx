import React from "react";
import { calculateTime } from "../helpers/calculateTime";

const TimeLinePlayer = ({ currentAudio }) => {
  return (
    <>
      <span className="currentTime">
        {calculateTime(currentAudio.currentTime)}
      </span>
      <span>/</span>
      {currentAudio.duration && (
        <span className="duration">{calculateTime(currentAudio.duration)}</span>
      )}
    </>
  );
};

export default TimeLinePlayer;
