import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Globalcontext } from "../contexts/GlobalContext";
import api from "../api/api";
import VideoItem from "../components/VideoItem";

const Search = () => {
  const { q } = useParams();
  const { setLoading, loading, setAlert } = useContext(Globalcontext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/video/search/${q}`);
        setLoading(false);
        setVideos(data.videos);
      } catch (error) {
        console.log(error);
        setAlert(error.response.data.error);
        setLoading(false);
      }
    };
    getVideos();
  }, [q]);

  if (loading) return <Loader />;
  return (
    <>
      {videos && (
        <div className="text-white">
          {videos && (
            <div className="grid grid-cols-1 grid-rows-1 gap-6 m-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center justify-items-center h-full">
              {videos.map((el, index) => {
                return <VideoItem video={el} key={index} />;
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
