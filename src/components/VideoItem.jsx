import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { usePlayer } from "../hooks/usePlayer";
import { current } from "@reduxjs/toolkit";

const VideoItem = ({ video }) => {
  const { playlist, startAudio, resetAudio } = usePlayer();

  const id = video.id.videoId || video.id;

  const navigate = useNavigate();

  const handlerClick = () => {
    if (playlist.id) {
      resetAudio();
    }

    startAudio({ id });
    navigate(`/video/${id}`);
  };

  return (
    <div className="flex flex-col justify-start items-center w-[340px] h-[280px] sm:w-[320px] sm:h-[270px] lg:w-[280px] lg:h-[260px]">
      <div className="position relative bg-slate-800 min-h-[160px] w-[320px] sm:w-[300px] lg:w-[280px]  rounded-xl">
        <img
          src={
            video.snippet?.thumbnails.medium.url ||
            video.thumbnail ||
            video.thumbnails[1].url ||
            ""
          }
          alt=""
          className=" position absolute top-0 right-0 rounded-xl cursor-pointer w-full h-full object-cover"
          loading="lazy"
          onClick={handlerClick}
        />
      </div>

      <div className="flex flex-col justify-start w-full my-2">
        <p className="text-white cursor-pointer text-md" onClick={handlerClick}>
          <strong>{video.snippet?.title || video.title}</strong>
        </p>

        <span className="text-gray-500 hover:text-blue-600 text-sm">
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
