import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Globalcontext } from "../contexts/GlobalContext";
import Loader from "../components/Loader";
import SideBar from "../components/SideBar";
import MainVideo from "../components/Video";
import { usePlayer } from "../hooks/usePlayer";
import { useDispatch } from "react-redux";

const Video = () => {
  const { id } = useParams();
  const { loading } = useContext(Globalcontext);
  const { currentAudio, status, loadInfo, resetAudio, resetUrl } = usePlayer();

  useEffect(() => {
    if (window.performance && id === currentAudio.id) {
      if (performance.navigation.type !== 1) return;
      resetUrl();
    }
  }, []);

  useEffect(() => {
    if (currentAudio.id && id !== currentAudio.id) resetAudio({ id });
  }, [id]);

  useEffect(() => {
    if (status === null) loadInfo({ id });
  }, [id, status]);

  if (loading) return <Loader />;

  return (
    <div className="w-full flex flex-col xl:flex-row xl:h-screen ">
      {currentAudio.info && <MainVideo infoVideo={currentAudio.info} />}
      {currentAudio.videosRelated && (
        <SideBar
          items={currentAudio.videosRelated}
          title={"Videos Relacionados"}
        />
      )}
    </div>
  );
};

export default Video;
