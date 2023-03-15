import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Video from "../pages/Video";
import Channel from "../pages/Channel";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/video/:id" element={<Video />} />
      <Route path="/channel/:id" element={<Channel />} />
    </Routes>
  );
};

export default AppRouter;
