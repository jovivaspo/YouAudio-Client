import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { usePlayer } from "../hooks/usePlayer";
import PlayIcon from "./icons/PlayIcon";

const ItemSidebarPlaylist = ({ video, playlist }) => {
  const { currentAudio } = usePlayer();

  const id = playlist.id;
  const idVideo = video.id;

  return (
    <div
      className="flex gap-2 justify-center items-center max-w-xs min-w-min p-2 rounded-xl"
      style={{
        backgroundColor:
          currentAudio.id === idVideo ? "#212121" : "transparent",
      }}
    >
      {currentAudio.id === idVideo && <PlayIcon />}
      <Link to={`/playlist/${id}/${idVideo}`}>
        <img
          src={
            video.snippet?.thumbnails.medium.url ||
            video.thumbnail ||
            video.thumbnails[1].url ||
            ""
          }
          alt=""
          className="rounded-xl"
          loading="lazy"
        />
      </Link>
      <div className="flex flex-col justify-start w-full my-2">
        <Link to={`/playlist/${id}/${idVideo}`}>
          <p className="text-white text-sm">
            <strong>{video.snippet?.title || video.title}</strong>
          </p>
        </Link>
        <span className="text-gray-500 hover:text-blue-600 text-xs">
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

export default ItemSidebarPlaylist;
