import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Globalcontext } from "../contexts/GlobalContext";
import api from "../api/api";
import VideoItem from "../components/VideoItem";
import Loader from "../components/Loader";
import ChannelHeader from "../components/ChannelHeader";
import ItemPlaylist from "../components/ItemPlaylist";
import { getNameUser } from "../helpers/getNameUser";

const Channel = () => {
  const [channel, setChannel] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [selected, setSelected] = useState("videos");
  const { setLoading, loading, setAlert } = useContext(Globalcontext);
  const { id } = useParams();

  useEffect(() => {
    const getChannel = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/video/channel/${id}`);
        setLoading(false);
        setChannel(data.channel);
      } catch (error) {
        console.log(error);
        setAlert(error.response.data.error);
        setLoading(false);
      }
    };
    getChannel();
  }, []);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        setLoading(true);
        const user = await getNameUser(channel);
        const { data } = await api.get(`/video/playlist/${user}`);
        setPlaylists(data.playlists);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setAlert(error.response.data.error);
        setLoading(false);
      }
    };
    if (selected === "playlists") {
      getPlaylist();
    }
  }, [selected]);

  if (loading || !channel) return <Loader />;

  return (
    <div className="w-full xl:w-[98%] xl:mx-auto flex flex-col">
      {channel && (
        <ChannelHeader
          selected={selected}
          channel={channel}
          setSelected={setSelected}
        />
      )}
      {channel && selected === "videos" && (
        <div className="grid grid-cols-1 grid-rows-1 gap-6 m-10 sm:grid-cols-2 lg:grid-cols-3 justify-center justify-items-center h-full">
          {channel.items.map((el, index) => {
            return <VideoItem video={el} key={index} />;
          })}
        </div>
      )}
      {selected === "playlists" && loading && !playlists && <Loader />}
      {selected === "playlists" && playlists && (
        <div className="grid grid-cols-1 grid-rows-1 gap-6 m-10 sm:grid-cols-2 lg:grid-cols-3  justify-center justify-items-center h-full">
          {playlists.map((el, index) => {
            return <ItemPlaylist playlist={el} key={index} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Channel;
