import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Globalcontext } from "../contexts/GlobalContext";
import api from "../api/api";
import Loader from "../components/Loader";
import VideosRelated from "../components/VideosRelated";
import MainVideo from "../components/Video";

const Video = () => {
  const { id } = useParams();
  const { setAlert, loading, setLoading } = useContext(Globalcontext);
  const [infoVideo, setInfoVideo] = useState(null);
  const [videosRelated, setVideosRelated] = useState(null);

  useEffect(() => {
    const getVideoInfo = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/video/info/${id}`);
        setInfoVideo(data.videoDetails);
        setVideosRelated(data.relatedVideos);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlert(error.response.data.error);
      }
    };
    getVideoInfo();
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="w-full flex flex-col xl:flex-row xl:h-screen ">
      {infoVideo && <MainVideo infoVideo={infoVideo} />}
      {videosRelated && <VideosRelated videosRelated={videosRelated} />}
    </div>
  );
};

export default Video;
