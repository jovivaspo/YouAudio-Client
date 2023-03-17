import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Globalcontext } from "../contexts/GlobalContext";
import api from "../api/api";
import { getDate } from "../helpers/getDate";
import VideoItem from "../components/VideoItem";
import Loader from "../components/Loader";

const Video = () => {
  const { id } = useParams();
  const { setAlert, loading, setLoading } = useContext(Globalcontext);
  const [infoVideo, setInfoVideo] = useState(null);
  const [videosRelated, setVideosRelated] = useState(null);

  useEffect(() => {
    const getVideoInfo = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/video/${id}`);
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

  console.log(infoVideo);
  console.log(videosRelated);

  if (loading) return <Loader />;

  return (
    <div className="w-full flex flex-col xl:flex-row xl:h-screen ">
      {infoVideo && (
        <div className="w-full flex flex-col gap-2 xl:p-4 text-white ">
          <div className="w-full p-4">
            <img
              src={infoVideo.thumbnails[infoVideo.thumbnails.length - 1].url}
              alt={infoVideo.title}
            />
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl">{infoVideo.title}</h3>
          <p className="flex gap-2 text-gray-400">
            <span>
              {parseInt(infoVideo.views).toLocaleString("es-ES")} views
            </span>
            <span>hace {getDate(infoVideo.date)}</span>
          </p>
          <div className="flex gap-2 items-center">
            <img
              src={infoVideo.channelImg.url}
              alt={infoVideo.channel}
              className="rounded-full"
            />
            <Link
              to={`/channel/${infoVideo.channelId}`}
              className="hover:text-blue-600"
            >
              {infoVideo.channel}
            </Link>
          </div>
        </div>
      )}

      {videosRelated && (
        <div className="flex flex-col w-full xl:w-1/3 xl:h-4/5 xl:overflow-hidden shrink-0 2xl:mr-4">
          <h3 className="text-white mt-10 text-lg sm:text-xl lg:text-2xl xl:text-center">
            Videos relacionados
          </h3>
          <div className="grid grid-cols-1 grid-rows-1 gap-6 m-10 sm:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center  xl:flex xl:flex-col xl:max-h-full xl:justify-start  xl:pt-4 xl:overflow-y-auto items-center">
            {videosRelated.map((el, index) => {
              return <VideoItem video={el} key={index} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
