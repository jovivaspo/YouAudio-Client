import React, { useContext } from "react";
import HeaderVideo from "../components/HeaderVideo";
import ListVideo from "../components/ListVideo";
import { Globalcontext } from "../contexts/GlobalContext";
import Loader from "../components/Loader";

const VideoPage = () => {
  const { loading } = useContext(Globalcontext);

  if (loading) return <Loader />;

  return (
    <div className="w-full xl:w-[90%] xl:mx-auto flex flex-col">
      <HeaderVideo />
      <ListVideo />
    </div>
  );
};

export default VideoPage;
