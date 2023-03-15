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
    <>
      {videos.length > 0 &&
        videos.map((video, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt=""
                className="rounded-xl"
              />
            </div>
          );
        })}
    </>
  );
};

export default Home;
