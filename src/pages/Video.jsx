import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Globalcontext } from "../contexts/GlobalContext";
import api from "../api/api";
import Loader from "../components/Loader";
import VideosRelated from "../components/VideosRelated";
import MainVideo from "../components/Video";
import { usePlayer } from "../hooks/usePlayer";

const Video = () => {
  const { id } = useParams();
  const { loading } = useContext(Globalcontext);
  const { loadInfo, loadAudio, resetAudio, status, audio } = usePlayer();

  useEffect(() => {
    if (audio.id && id !== audio.id) {
      resetAudio({ id: audio.id });
    }
  }, [id]);

  useEffect(() => {
    if (!audio.id) {
      loadInfo({ id });
    }
  }, [audio.id]);

  useEffect(() => {
    if (audio.info && audio.videosRelated.length >= 0) {
      loadAudio({ id });
    }
  }, [audio.info, audio.videosRelated]);

  if (loading) return <Loader />;

  return (
    <div className="w-full flex flex-col xl:flex-row xl:h-screen ">
      {audio.info && <MainVideo infoVideo={audio.info} />}
      {audio.videosRelated && (
        <VideosRelated videosRelated={audio.videosRelated} />
      )}
    </div>
  );
};

export default Video;
