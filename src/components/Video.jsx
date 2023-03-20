import { Link } from "react-router-dom";
import { getDate } from "../helpers/getDate";
import Player from "../components/Player";
import { usePlayer } from "../hooks/usePlayer";
import converter from "../assets/converter.svg";

const MainVideo = ({ infoVideo }) => {
  const { status } = usePlayer();
  return (
    <div className="w-full flex flex-col gap-2 xl:p-4 text-white ">
      <div className="relative ">
        {status === "converting" && (
          <div className="h-full w-full absolute top-0 left-0 bg-black opacity-80 flex justify-center items-center">
            <img
              src={converter}
              alt="Convirtiendo vídeo"
              className="w-24 sm:w-32"
            />
          </div>
        )}
        <img
          src={infoVideo.thumbnails[infoVideo.thumbnails.length - 1].url}
          alt={infoVideo.title}
          className="w-full"
        />
        <Player id={infoVideo.id} />
      </div>
      <h3 className="text-lg sm:text-xl lg:text-2xl">{infoVideo.title}</h3>
      <p className="flex gap-2 text-gray-400">
        <span>{parseInt(infoVideo.views).toLocaleString("es-ES")} views</span>
        <span>hace {getDate(infoVideo.date)}</span>
      </p>
      <div className="flex gap-2 items-center">
        <img
          src={infoVideo.channelImg.url}
          alt={infoVideo.channel}
          className="rounded-full"
        />
        <Link
          to={`/channel/${infoVideo.channelId}`}
          className="hover:text-blue-600"
        >
          {infoVideo.channel}
        </Link>
      </div>
    </div>
  );
};

export default MainVideo;