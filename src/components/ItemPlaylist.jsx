import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onPlaylist } from "../store/player/playerSlice";
import PlaylistIcon from "./icons/PlaylistIcon";
import { usePlayer } from "../hooks/usePlayer";

const ItemPlaylist = ({ playlist }) => {
  const navigate = useNavigate();
  const distpatch = useDispatch();

  const { startAudio } = usePlayer();


  const handlerClick = () => {
   
    distpatch(
      onPlaylist({
        title: playlist.title,
        items: playlist.items,
        id: playlist.id,
        channel: {
          title: playlist.author.name,
          img: playlist.author.bestAvatar.url,
        },
      })
    );
    localStorage.setItem(
      "playlist",
      JSON.stringify({
        title: playlist.title,
        items: playlist.items,
        id: playlist.id,
        channel: {
          title: playlist.author.name,
          img: playlist.author.bestAvatar.url,
        },
      })
    );
    startAudio({ id: playlist.items[0].id });
    navigate(`/playlist/${playlist.id}/${playlist.items[0].id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center w-[340px] h-[280px] sm:w-[320px] sm:h-[270px] lg:w-[280px] lg:h-[260px]">
      <div onClick={handlerClick} className="relative cursor-pointer">
        <div className="absolute z-10 top-0 right-0 w-1/3 h-full bg-black opacity-60 rounded-r-xl flex flex-col justify-center items-center">
          <p className="text-white text-lg">{playlist.estimatedItemCount}</p>
          <PlaylistIcon />
        </div>
        <div className="position relative bg-slate-800 min-h-[160px] w-[320px] sm:w-[300px] lg:w-[280px]  rounded-xl">
        <img
          src={
            playlist.snippet?.thumbnails.medium.url ||
            playlist.thumbnails[0].url ||
            ""
          }
          alt=""
          className=" position absolute top-0 right-0 rounded-xl cursor-pointer w-full h-full object-cover"
          loading="lazy"
        />
         </div>
      </div>
      <div className="flex flex-col justify-start w-full my-2">
        <p className="text-white">
          <strong>{playlist.title}</strong>
        </p>

        <span className="text-gray-500">{playlist.author.name}</span>
      </div>
    </div>
  );
};

export default ItemPlaylist;
