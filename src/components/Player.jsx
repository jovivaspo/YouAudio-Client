import { useEffect } from "react";
import { usePlayer } from "../hooks/usePlayer";
import ControlPlayer from "./ControlPlayer";
import ProgressBar from "./ProgressBar";
import TimeLinePlayer from "./TimeLinePlayer";
import Audio from "./audio";

const Player = () => {
  const { currentAudio, status, playlist, togglePlayPause } = usePlayer();

  console.log(currentAudio);

  if (status !== "saved" && status !== "ready" && status !== "new-url")
    return <></>;

  return (
    <div className="w-full sticky bottom-0 h-20 sm:h-28 bg-[#181818] flex justify-center items-center">
      <div className="relative h-full w-11/12 flex flex-col items-center gap-2 p-2 sm:gap-4 sm:p-4">
        <div className="w-40  flex justify-around">
          <ControlPlayer
            togglePlayPause={togglePlayPause}
            currentAudio={currentAudio}
            playlist={playlist}
          />
        </div>

        <ProgressBar currentAudio={currentAudio} />
        <TimeLinePlayer currentAudio={currentAudio} />
      </div>
    </div>
  );
};

export default Player;
