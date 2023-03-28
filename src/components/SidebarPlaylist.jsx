import React from "react";
import ItemSidebarPlaylist from "./ItemSidebarPlaylist";

const SidebarPlaylist = ({ playlist }) => {
  return (
    <div className="flex flex-col w-full xl:w-1/3 xl:h-4/5 xl:overflow-hidden shrink-0 2xl:mr-4">
      <h3 className="text-white mt-10 text-lg sm:text-xl lg:text-2xl xl:text-center">
        {playlist.title}
      </h3>
      <div className="grid grid-cols-1 grid-rows-1 gap-6 m-10 sm:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center  xl:flex xl:flex-col xl:max-h-full xl:justify-start  xl:pt-4 xl:overflow-y-auto items-center">
        {playlist.items.map((el, index) => {
          return (
            <ItemSidebarPlaylist video={el} key={index} playlist={playlist} />
          );
        })}
      </div>
    </div>
  );
};

export default SidebarPlaylist;
