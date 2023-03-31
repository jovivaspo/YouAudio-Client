import { usePlayer } from "../hooks/usePlayer";
import ControlPlayer from "./ControlPlayer";
import ProgressBar from "./ProgressBar";
import TimeLinePlayer from "./TimeLinePlayer";

const Player = () => {
  const { currentAudio, status, playlist, togglePlayPause } = usePlayer();

  return (
    <div
      style={{
        display:
          status !== "audio-saved" &&
          status !== "audio-ready" &&
          status !== "reset-url"
            ? "none"
            : "block",
      }}
      className="w-full fixed bottom-0 h-20 sm:h-28 bg-[#181818] flex justify-center items-center"
    >
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
