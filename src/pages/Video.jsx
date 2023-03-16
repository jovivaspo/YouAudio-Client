import React from "react";
import { useParams } from "react-router-dom";

const Video = () => {
  const { id } = useParams();

  return <div className="text-white">{id}</div>;
};

export default Video;
