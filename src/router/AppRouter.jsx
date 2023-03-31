import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ChannelPage from "../pages/ChannelPage";
import PlaylistPage from "../pages/PlaylistPage";
import SearchPage from "../pages/SearchPage";
import VideoPage from "../pages/VideoPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:category" element={<HomePage />} />
      <Route path="/search/:q" element={<SearchPage />} />
      <Route path="/video/:id" element={<VideoPage />} />
      <Route path="/channel/:id" element={<ChannelPage />} />
      <Route path="/playlist/:id/:idVideo" element={<PlaylistPage />} />
    </Routes>
  );
};

export default AppRouter;
