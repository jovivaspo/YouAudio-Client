import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Globalcontext } from "../contexts/GlobalContext";
import { usePlayer } from "../hooks/usePlayer";
import MainVideo from "../components/Video";
import SideBar from "../components/SideBar";
import SidebarPlaylist from "../components/SidebarPlaylist";

const Playlist = () => {
  const { loading } = useContext(Globalcontext);
  const { currentAudio, status, playlist, loadInfo, resetAudio, resetUrl } =
    usePlayer();
  const { idVideo } = useParams();

  useEffect(() => {
    if (window.performance && idVideo === currentAudio.id) {
      if (performance.navigation.type !== 1) return;
      resetUrl();
    }
  }, []);

  useEffect(() => {
    if (currentAudio.id && idVideo !== currentAudio.id)
      resetAudio({ id: idVideo });
  }, [idVideo]);

  useEffect(() => {
    if (status === null) loadInfo({ id: idVideo });
  }, [idVideo, status]);

  if (loading) return <Loader />;

  return (
    <div className="w-full flex flex-col xl:flex-row xl:h-screen ">
      {currentAudio.info && <MainVideo infoVideo={currentAudio.info} />}
      {currentAudio.videosRelated && <SidebarPlaylist playlist={playlist} />}
    </div>
  );
};

export default Playlist;
