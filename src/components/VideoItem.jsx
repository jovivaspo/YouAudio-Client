import React from "react";
import { Link } from "react-router-dom";

const VideoItem = ({ video }) => {
  return (
    <div className="flex flex-col justify-center items-center max-w-xs min-w-min">
      <Link to={`/video/${video.id.videoId || video.id}`}>
        <img
          src={
            video.snippet?.thumbnails.medium.url ||
            video.thumbnail ||
            video.thumbnails[1].url ||
            ""
          }
          alt=""
          className="rounded-xl"
        />
      </Link>
      <div className="flex flex-col justify-start w-full my-2">
        <Link to={`/video/${video.id.videoId || video.id}`}>
          <p className="text-white">
            <strong>{video.snippet?.title || video.title}</strong>
          </p>
        </Link>
        <span className="text-gray-500 hover:text-blue-600">
          <Link
            to={`/channel/${
              video.snippet?.channelId ||
              video.author?.channelID ||
              video.channel?.id ||
              video.author?.id
            }`}
          >
            {video.snippet?.channelTitle ||
              video.author?.name ||
              video.channel.name}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default VideoItem;