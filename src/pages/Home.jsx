import React, { useContext, useEffect, useState } from "react";
import { categories } from "../helpers/categories";
import api from "../api/api";
import { Globalcontext } from "../contexts/GlobalContext";
import { Link } from "react-router-dom";

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
              <Link to={`/video/${video.id.videoId}`}>
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt=""
                  className="rounded-xl"
                />
              </Link>
              <div className="flex flex-col justify-start w-full my-2">
                <Link to={`/video/${video.id.videoId}`}>
                  <p className="text-white">
                    <strong>{video.snippet.title}</strong>
                  </p>
                </Link>
                <span className="text-gray-500 hover:text-blue-600">
                  <Link to={`/channel/${video.snippet.channelId}`}>
                    {video.snippet.channelTitle}
                  </Link>
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
