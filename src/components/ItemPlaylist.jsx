import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PlaylistIcon from "./icons/PlaylistIcon";

const ItemPlaylist = ({ video }) => {
  const refImg = useRef();
  const ref = useRef();

  const handlerOver = (e) => {
    if (ref.current.contains(e.target) || refImg.current.contains(e.target)) {
      ref.current.style.width = "100%";
    }
  };

  const handlerOut = (e) => {
    if (ref.current.contains(e.target) || refImg.current.contains(e.target)) {
      ref.current.style.width = "33.33%";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center max-w-xs min-w-min">
      <Link
        to={`/playlist/${video.id.videoId || video.id}`}
        className="relative"
        onMouseOver={handlerOver}
        onMouseOut={handlerOut}
      >
        <div
          ref={ref}
          className="absolute z-10 top-0 right-0 w-1/3 h-full bg-black opacity-60 rounded-r-xl flex flex-col justify-center items-center"
        >
          <p className="text-white text-lg">{video.estimatedItemCount}</p>
          <PlaylistIcon />
        </div>
        <img
          ref={refImg}
          src={
            video.snippet?.thumbnails.medium.url ||
            video.thumbnails[0].url ||
            ""
          }
          alt=""
          className="rounded-xl"
        />
      </Link>
      <div className="flex flex-col justify-start w-full my-2">
        <p className="text-white">
          <strong>{video.snippet?.title || video.title}</strong>
        </p>

        <span className="text-gray-500">
          {video.snippet?.channelTitle || video.author.name}
        </span>
      </div>
    </div>
  );
};

export default ItemPlaylist;
