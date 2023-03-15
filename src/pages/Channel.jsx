import React from "react";
import { useParams } from "react-router-dom";

const Channel = () => {
  const { id } = useParams();
  console.log(id);
  return <div>Channel</div>;
};

export default Channel;
