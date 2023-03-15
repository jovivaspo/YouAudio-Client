import React, { useContext, useEffect, useState } from "react";
import { categories } from "../helpers/categories";
import api from "../api/api";
import { Globalcontext } from "../contexts/GlobalContext";

const Home = () => {
  const { videos, setVideos, selected } = useContext(Globalcontext);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const { data } = await api.get(`/video/category/${selected}`);
        setVideos(data.results);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getCategories();
  }, [selected]);
  console.log(videos);
  return (

     <div className="grid grid-cols-1 grid-rows-1 gap-6 m-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center justify-items-center h-full">
     {videos.length > 0 &&
        videos.map((video, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center max-w-xs min-w-min"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt=""
                className="rounded-xl"
              />
            </div>
          );
        })}
        </div>
    
  );
};

export default Home;
