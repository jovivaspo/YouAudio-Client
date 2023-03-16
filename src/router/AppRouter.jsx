import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Video from "../pages/Video";
import Channel from "../pages/Channel";
import Playlist from "../pages/Playlist";
import Search from "../pages/Search";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Home />} />
      <Route path="/search/:q" element={<Search />} />
      <Route path="/video/:id" element={<Video />} />
      <Route path="/channel/:id" element={<Channel />} />
      <Route path="/playlist/:id" element={<Playlist />} />
    </Routes>
  );
};

export default AppRouter;
