import React from "react";
import { useParams } from "react-router-dom";

const Video = () => {
  const { id } = useParams();
  return <div>Video</div>;
};

export default Video;