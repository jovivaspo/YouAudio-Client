import { useEffect, useState } from "react";
import { usePlayer } from "../hooks/usePlayer";
import ControlPlayer from "./ControlPlayer";
import ProgressBar from "./ProgressBar";
import TimeLinePlayer from "./TimeLinePlayer";
import { Link } from "react-router-dom";

const Player = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  const { currentAudio, status, playlist, togglePlayPause, startAudio } =
    usePlayer();

  useEffect(() => {
    if (!currentAudio.info) return;

    setTitle(currentAudio.info.title);
    setImg(currentAudio.info.thumbnails[0].url);
  }, [status]);

  return (
    <div
      style={{
        display: status === null ? "none" : "block",
      }}
      className="w-full fixed bottom-0 h-20 sm:h-28 bg-[#181818] flex justify-center items-center z-10"
    >
      <div className="relative h-full w-11/12 flex flex-col justify-center mx-auto items-center gap-2 p-2 sm:gap-4 sm:p-4 sm:flex-row">
        <div className="flex flex-row justify-around gap-2 w-50">
          <Link
            to={`/video/${currentAudio.id}`}
            className="w-16 sm:w-20 rounded-lg "
          >
            <img className="w-16 sm:w-20 rounded-lg " src={img} alt={title} />
          </Link>

          <div className=" overflow-hidden flex items-center w-[280px]">
            <h3 className="text-white whitespace-pre animate-[move_linear_30s_infinite]">
              {title}
            </h3>
          </div>
        </div>
        <div className="w-full flex flex-col justify-around items-center gap-2 sm:gap-3">
          <div className="flex w-40  justify-around">
            <ControlPlayer
              togglePlayPause={togglePlayPause}
              startAudio={startAudio}
              currentAudio={currentAudio}
              playlist={playlist}
            />
          </div>
          <div className="hidden sm:flex w-full">
            <ProgressBar currentAudio={currentAudio} />
          </div>
          <div className="hidden sm:flex">
            <TimeLinePlayer currentAudio={currentAudio} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
