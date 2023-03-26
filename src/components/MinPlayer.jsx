import { current } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Player from "./Player";

const MinPlayer = () => {
  const { currentAudio, status } = useSelector((state) => state.player);
  const refMinPlayer = useRef();
  const location = useLocation();

  useEffect(() => {
    location.pathname.includes("/video/") && refMinPlayer.current
      ? (refMinPlayer.current.style.display = "none")
      : (refMinPlayer.current.style.display = "flex");
  }, [location.pathname]);

  const thumbnails =
    currentAudio?.info?.thumbnails[currentAudio.info.thumbnails.length - 1]
      ?.url;
  const title = currentAudio?.title;

  return (
    <div
      ref={refMinPlayer}
      className="fixed bottom-0 left-0  w-full flex  sm:bottom-2 sm:right-8 text-white rounded-lg"
    >
      <div>
        <img src={thumbnails} alt={title} className="w-20 rounded-lg" />
      </div>
      <div className="relative flex ">
        {status === "ready" && <Player currentAudio={currentAudio} />}
      </div>
    </div>
  );
};

export default MinPlayer;
