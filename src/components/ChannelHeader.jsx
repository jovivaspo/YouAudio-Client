import React from "react";

const ChannelHeader = ({ setSelected, channel, selected }) => {
  return (
    <div>
      <div className="text-white flex justify-start gap-8 w-full p-4">
        <img
          src={channel.author.bestAvatar.url}
          alt="Avatar"
          className="w-20 h-20 rounded-full"
        />
        <h3 className="text-xl">{channel.author.name}</h3>
      </div>
      <div className="text-white text-lg flex justify-start gap-8 m-4">
        <p
          style={{
            color: selected === "videos" ? "rgb(37 99 235)" : "white",
          }}
          className="cursor-pointer hover:text-gray-500"
          onClick={() => setSelected("videos")}
        >
          <strong> Vídeos</strong>
        </p>
        <p
          style={{
            color: selected === "playlists" ? "rgb(37 99 235)" : "white",
          }}
          className="cursor-pointer hover:text-gray-500"
          onClick={() => setSelected("playlists")}
        >
          <strong>Playlists</strong>
        </p>
      </div>
      <hr />
    </div>
  );
};

export default ChannelHeader;
