import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import api from "../api/api";
import { Globalcontext } from "../contexts/GlobalContext";

import VideoItem from "../components/VideoItem";

const Home = () => {
  const { videos, setVideos, selected, setAlert, setLoading, loading } =
    useContext(Globalcontext);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setVideos([]);
        setLoading(true);
        const { data } = await api.get(`/video/category/${selected}`);
        setVideos(data.results);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.error);
        setAlert(error.response.data.error);
      }
    };

    getCategories();
  }, [selected]);

  if (loading) return <Loader />;

  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-6 m-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center justify-items-center h-full">
      {videos.length > 0 &&
        videos.map((video, index) => {
          return <VideoItem video={video} key={index} />;
        })}
    </div>
  );
};

export default Home;
