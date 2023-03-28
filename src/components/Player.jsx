import { useEffect } from "react";
import { usePlayer } from "../hooks/usePlayer";
import ControlPlayer from "./ControlPlayer";
import ProgressBar from "./ProgressBar";
import TimeLinePlayer from "./TimeLinePlayer";
import Audio from "./audio";

const Player = () => {
  const { currentAudio, status, playlist, togglePlayPause, savingAudio } = usePlayer();

  useEffect(() => {
    if (status !== "new-item-selected") return;
    savingAudio({ id: currentAudio.id });
  }, [status]);

  if (status !== "saved" && status !== "ready" && status !== "new-url")
    return <></>;

  return (
    <>
      <Audio />
      <ProgressBar currentAudio={currentAudio} />
      <div className="absolute bottom-0 left-0 flex gap-6 items-center pl-4 w-full h-11 bg-black opacity-50  z-30"></div>
      <div className="absolute bottom-0 left-0 flex gap-6 items-center pl-4 w-44 h-10 z-30">
        <ControlPlayer
          togglePlayPause={togglePlayPause}
          currentAudio={currentAudio}
          playlist={playlist}
        />
      </div>
      <div className="absolute bottom-0 left-40 h-10 flex items-center gap-1 z-30 sm:left-44">
        <TimeLinePlayer currentAudio={currentAudio} />
      </div>
    </>
  );
};

export default Player;
