import { useEffect, useState } from "react";
import { usePlayer } from "../hooks/usePlayer";
import ControlPlayer from "./ControlPlayer";
import ProgressBar from "./ProgressBar";
import TimeLinePlayer from "./TimeLinePlayer";
import { Link } from "react-router-dom";
import converter from "../assets/converter.svg";

const Player = () => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [imageLaod, setImageLoad] = useState(false);

  const handlerLoadImage = () => {
    setImageLoad(true);
  };

  const { currentAudio, status,  togglePlayPause,  handlerNext, handlerPrev } =
    usePlayer();

  useEffect(() => {
    if (!currentAudio.info) return

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
        <div className="flex flex-row justify-around gap-2 w-[300px] h-5">
          <div className="relative w-16 sm:w-20 h-10">
          {currentAudio.info && (  <Link
            to={`/video/${currentAudio.id}`}
            className="w-20 sm:w-24 rounded-lg "
          >
            {status !== "audio-ready" && imageLaod && (
          <div className="absolute bottom-0 left-0 bg-black w-full h-full opacity-30 flex justify-center items-center">
            <img src={converter} alt="Convirtiendo vídeo" className="w-6" />
          </div>
        )}
            <img className="w-16 sm:w-20 h-full object-contain  rounded-lg " src={img} alt={title} onLoad={handlerLoadImage} />
          </Link> )}
          </div>
         
        
          <div className=" overflow-hidden flex items-center w-[280px]">
          {currentAudio.info && ( 
            <h3 className="text-white whitespace-pre animate-[move_linear_30s_infinite]">
              {title}
            </h3>
          )}
         </div>
        </div>
        <div className="w-full flex flex-col justify-around items-center gap-2 sm:gap-3">
          <div className="flex w-40  justify-around">
            <ControlPlayer
              togglePlayPause={togglePlayPause}
              handlerNext={handlerNext}
              handlerPrev={handlerPrev}
              
              currentAudio={currentAudio}
             
            />
          </div>
          <div className="hidden sm:flex w-full">
            <ProgressBar currentAudio={currentAudio} />
          </div>
          <div className="hidden sm:flex h-4">
          { status === "audio-ready" && (
           <TimeLinePlayer currentAudio={currentAudio} />
          )
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
