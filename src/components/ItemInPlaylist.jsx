import { useEffect, useState } from "react";
import { usePlayer } from "../hooks/usePlayer";
import PlayIcon from "../components/icons/PlayIcon";
import PauseIcon from "./icons/PauseIcon";
import converter from "../assets/converter.svg";

const ItemInPlaylist = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { playlist, currentAudio, status, startAudio } = usePlayer();

  useEffect(() => {
    if (video.id !== currentAudio.id) return setIsPlaying(false);
    if (video.id === currentAudio.id && status !== "audio-ready")
      return setIsPlaying(false);
    setIsPlaying(true);
  }, [status, isLoading]);

  useEffect(() => {
    if (status !== "audio-ready" && video.id === currentAudio.id)
      return setIsLoading(true);
    setIsLoading(false);
  }, [status, isPlaying]);

  const handlerClick = () => {
    if (isPlaying || isLoading) return;
    startAudio({ id: playlist.items[video.index - 1].id });
  };

  return (
    <div
      className="relative flex flex-col justify-center items-center text-white p-4 gap-1 cursor-pointer rounded-xl md:w-3/4 md:mx-auto md:flex-row md:gap-4 md:justify-start"
      style={{ background: isPlaying || isLoading ? "#4A5568" : "transparent" }}
      onClick={handlerClick}
    >
      {isPlaying && (
        <div className="absolute w-full h-full top-0 flex justify-center items-center bg-black opacity-50 md:left-0 md:w-[368px] md:m-0">
          {currentAudio.isPlaying ? (
            <PauseIcon width={50} height={50} className="mb-10 md:m-0" />
          ) : (
            <PlayIcon width={50} height={50} className="mb-10 md:m-0" />
          )}
        </div>
      )}
      {isLoading && (
        <div className="absolute w-full h-full top-0 flex justify-center items-center bg-black opacity-50 md:left-0 md:w-[368px] md:m-0  ">
          <img
            src={converter}
            className="mb-10 md:m-0"
            width={50}
            height={50}
          />
        </div>
      )}

      <img
        src={video.thumbnails[0].url}
        alt={video.title}
        className="rounded-xl"
      />

      <h3
        className="text-lg ml-4"
        style={{ color: isPlaying ? "#0075FF" : "white" }}
      >
        {video.title}
      </h3>
    </div>
  );
};

export default ItemInPlaylist;
