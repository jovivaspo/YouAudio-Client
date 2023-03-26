import { Link } from "react-router-dom";
import { getDate } from "../helpers/getDate";
import Player from "../components/Player";
import { usePlayer } from "../hooks/usePlayer";
import converter from "../assets/converter.svg";
import { useDispatch } from "react-redux";
import { onPlaying } from "../store/player/playerSlice";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import { useRef } from "react";

const MainVideo = ({ infoVideo }) => {
  const { status, currentAudio, togglePlayPause } = usePlayer();

  const ref = useRef();

  const handlerClick = () => {
    togglePlayPause();

    if (ref.current) {
      ref.current.style.opacity = "30%";
      const timeVisibility = setTimeout(() => {
        ref.current.style.opacity = "0";
      }, [500]);
      return () => clearTimeout(timeVisibility);
    }
  };

  return (
    <div className="w-full flex flex-col gap-2 xl:p-4 text-white ">
      <div className="relative w-full">
        {status !== "ready" && (
          <div className="h-full w-full absolute top-0 left-0 bg-black opacity-60 flex justify-center items-center ">
            <img
              src={converter}
              alt="Convirtiendo vídeo"
              className="w-24 sm:w-32"
            />
          </div>
        )}
        <div
          className="absolute z-20 w-full h-full flex justify-center items-center"
          onClick={handlerClick}
        >
          <div
            className="w-28 h-28 rounded-full bg-black flex justify-center items-center ease-out duration-500 opacity-0"
            ref={ref}
          >
            {currentAudio?.isPlaying ? (
              <PlayIcon width={50} height={50} />
            ) : (
              <PauseIcon width={50} height={50} />
            )}
          </div>
        </div>
        <img
          src={infoVideo.thumbnails[infoVideo.thumbnails.length - 1].url}
          alt={infoVideo.title}
          className="w-full"
        />
        <Player />
      </div>
      <h3 className="text-lg sm:text-xl lg:text-2xl">{infoVideo.title}</h3>
      <p className="flex gap-2 text-gray-400">
        <span>{parseInt(infoVideo.views).toLocaleString("es-ES")} views</span>
        <span>hace {getDate(infoVideo.date)}</span>
      </p>
      <div className="flex gap-2 items-center">
        <img
          src={infoVideo?.channelImg?.url}
          alt={infoVideo?.channel}
          className="rounded-full"
        />
        <Link
          to={`/channel/${infoVideo?.channelId}`}
          className="hover:text-blue-600"
        >
          {infoVideo?.channel}
        </Link>
      </div>
    </div>
  );
};

export default MainVideo;
