import React from "react";
import { usePlayer } from "../hooks/usePlayer";
import ItemInPlaylist from "./ItemInPlaylist";
import { Link } from "react-router-dom";

const Playlist = () => {
  const { playlist, currentAudio } = usePlayer();

  if (playlist.items.length === 0) return <></>;
  return (
    <div className="w-full flex flex-col gap-6 p-4">
      <div>
        <div className="text-white flex justify-start gap-8 w-full p-4">
          <img
            src={playlist?.channel?.img}
            alt="Avatar"
            className="w-20 h-20 rounded-full"
          />
          <div className="flex flex-col gap-4">
            <h3 className="text-xl">
              <Link to={`/channel/${currentAudio?.info?.channelId}`} className="hover:text-blue-600" >
                {playlist?.channel?.title}
              </Link>
            </h3>
          </div>
        </div>

        <hr />
      </div>
      <h3 className="text-white text-2xl">{playlist.title}</h3>
      {playlist.items.map((video, index) => {
        return <ItemInPlaylist video={video} key={index} />;
      })}
    </div>
  );
};

export default Playlist;
