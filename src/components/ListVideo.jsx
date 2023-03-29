import React from "react";
import { usePlayer } from "../hooks/usePlayer";
import ItemListVideo from "./ItemListVideo";

const ListVideo = () => {
  const { currentAudio } = usePlayer();
  if (!currentAudio.videosRelated) return <></>;
  return (
    <div className="w-full flex flex-col gap-8 p-8 pt-4 sm:p-10 text-white">
      <h3 className=" text-2xl">Videos Relacionados</h3>
      <div className="grid grid-cols-xs md:grid-cols-md">
        <span className="flex items-center">#</span>
        <span className="ml-8">Título</span>
        <span className="hidden md:block mx-auto">Canal</span>
        <span className="hidden md:block mx-auto">Fecha publicación</span>
        <span className="hidden md:block mx-auto">Duración</span>
      </div>
      <div className="w-full flex flex-col gap-8">
        {currentAudio.videosRelated.map((video, index) => {
          return <ItemListVideo video={video} key={index} index={index} />;
        })}
      </div>
    </div>
  );
};

export default ListVideo;
