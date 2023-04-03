import { useState } from "react";
import { usePlayer } from "../hooks/usePlayer";
import converter from "../assets/converter.svg";
import { Link } from "react-router-dom";
import { getDate } from "../helpers/getDate";
import ControlPlayer from "./ControlPlayer";
import ProgressBar from "./ProgressBar";
import TimeLinePlayer from "./TimeLinePlayer";

const HeaderVideo = () => {
  const [imageLaod, setImageLoad] = useState(false);

  const { currentAudio, status, togglePlayPause, handlerNext, handlerPrev } =
    usePlayer();

  const handlerLoadImage = () => {
    setImageLoad(true);
  };

  return (
    <div className="w-full sm:h-60 flex flex-col items-center text-white p-8 sm:p-10 gap-4 sm:flex-row sm:gap-8">
      <div className="relative w-72 h-full flex justify-center items-center">
        {status !== "audio-ready" && imageLaod && (
          <div className="absolute top-0 left-0 bg-black w-full h-full opacity-60 flex justify-center items-center">
            <img src={converter} alt="Convirtiendo vídeo" className="w-24 " />
          </div>
        )}
        <img
          src={
            currentAudio.info?.thumbnails[
              currentAudio.info.thumbnails.length - 2
            ].url
          }
          alt={currentAudio.info?.title}
          className="w-full h-full object-contain "
          loading="lazy"
          onLoad={handlerLoadImage}
        />
        {status === "audio-ready" && imageLaod && (
          <>
            <div className="absolute bottom-0 left-0 bg-black opacity-40 w-full z-10 h-8"></div>
            <div className="absolute bottom-8 left-0 flex justify-around w-full z-20 ">
              <ProgressBar currentAudio={currentAudio} />
            </div>
            <div className="sm:hidden absolute bottom-0 right-1 flex  justify-around z-20">
              <TimeLinePlayer currentAudio={currentAudio} />
            </div>
            <div className="absolute bottom-0 left-0 flex justify-around w-40  z-20">
              <ControlPlayer
                togglePlayPause={togglePlayPause}
                handlerNext={handlerNext}
                handlerPrev={handlerPrev}

                currentAudio={currentAudio}
               
              />
            </div>
          </>
        )}
      </div>
      {currentAudio.info && (
        <div className="flex flex-col gap-2 sm:gap-4">
          <h3 className="text-lg sm:text-2xl lg:text-4xl">
            {currentAudio.info?.title}
          </h3>
          <p className="flex gap-2 text-gray-400">
            <span>
              {parseInt(currentAudio.info?.views).toLocaleString("es-ES")} views
            </span>
            <span>hace {getDate(currentAudio.info?.date)}</span>
          </p>
          <div className="flex gap-2 items-center">
            <img
              src={currentAudio.info?.channelImg?.url}
              alt={currentAudio.info?.channel}
              className="rounded-full"
            />
            <Link
              to={`/channel/${currentAudio.info?.channelId}`}
              className="hover:text-blue-600"
            >
              {currentAudio.info?.channel}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderVideo;
