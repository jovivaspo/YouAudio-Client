import { Link, useNavigate } from "react-router-dom";
import { calculateTime } from "../helpers/calculateTime";
import { usePlayer } from "../hooks/usePlayer";

const ItemListVideo = ({ video, index }) => {
  const id = video.id.videoId || video.id;
  const { playlist, startAudio, resetAudio } = usePlayer();

  const navigate = useNavigate();

  const handlerClick = () => {
    if (playlist.id) {
      resetAudio();
    }

    startAudio({ id });
    navigate(`/video/${id}`);
  };

  return (
    <div className="grid grid-cols-xs md:grid-cols-md">
      <span className="flex items-center">{index + 1}</span>
      <div className="flex items-center gap-2 ml-8" onClick={handlerClick}>
        <Link to={`/video/${id}`}>
          <img
            src={
              video.snippet?.thumbnails.medium.url ||
              video.thumbnail ||
              video.thumbnails[1].url ||
              ""
            }
            alt=""
            className="w-28 rounded-xl"
            loading="lazy"
          />
        </Link>
        <div className="w-3/4">
          <p className="text-white text-sm ">
            {video.snippet?.title || video.title}
          </p>
        </div>
      </div>

      <Link
        className="hidden md:block mx-auto"
        to={`/channel/${
          video.snippet?.channelId ||
          video.author?.channelID ||
          video.channel?.id ||
          video.author?.id
        }`}
      >
        <span className="text-gray-500 hover:text-blue-600">
          {video.snippet?.channelTitle ||
            video.author?.name ||
            video.channel.name}
        </span>
      </Link>
      <span className="hidden md:block mx-auto text-gray-500">
        {video.published}
      </span>
      <span className="hidden md:block mx-auto text-gray-500">
        {calculateTime(video.length_seconds)}
      </span>
    </div>
  );
};

export default ItemListVideo;
