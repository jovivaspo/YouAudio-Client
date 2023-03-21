import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Globalcontext } from "../contexts/GlobalContext";
import { usePlayer } from "../hooks/usePlayer";
import MainVideo from "../components/Video";
import Loader from "../components/Loader";
import SidePlaylist from "../components/SidePlaylist";

const Playlist = () => {
  const { currentAudio, items, title } = useSelector((state) => state.playlist);

  const { loading } = useContext(Globalcontext);
  const { loadInfo, loadAudio, resetAudio, audio, status } = usePlayer();

  useEffect(() => {
    if (audio.id && currentAudio.id !== audio.id) {
      resetAudio({ id: audio.id });
    }
  }, []);

  useEffect(() => {
    if (!audio.id) {
      loadInfo({ id: currentAudio.id });
    }
  }, [audio.id]);

  useEffect(() => {
    if (!audio.info || !audio.id) return;
    loadAudio({ id: currentAudio.id });
  }, [audio.info, audio.id]);

  if (loading) return <Loader />;

  return (
    <div className="w-full flex flex-col xl:flex-row xl:h-screen ">
      {audio.info && (
        <>
          <MainVideo infoVideo={audio.info} />
          <SidePlaylist items={items} title={title} />
        </>
      )}
    </div>
  );
};

export default Playlist;
