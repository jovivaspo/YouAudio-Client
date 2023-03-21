import React from "react";
import VideoItem from "./VideoItem";

const SidePlaylist = ({ items, title }) => {
  return (
    <div className="flex flex-col w-full xl:w-1/3 xl:h-4/5 xl:overflow-hidden shrink-0 2xl:mr-4">
      <h3 className="text-white mt-10 text-lg sm:text-xl lg:text-2xl xl:text-center">
        {title}
      </h3>
      <div className="grid grid-cols-1 grid-rows-1 gap-6 m-10 sm:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center  xl:flex xl:flex-col xl:max-h-full xl:justify-start  xl:pt-4 xl:overflow-y-auto items-center">
        {items.map((el, index) => {
          return <VideoItem video={el} key={index} />;
        })}
      </div>
    </div>
  );
};

export default SidePlaylist;
