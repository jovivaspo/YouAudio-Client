import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePlayer } from "../hooks/usePlayer";
import Audio from "./audio";
import ControlPlayer from "./ControlPlayer";

const MinPlayer = () => {
  const [show, setShow] = useState(false);
  const refMinPlayer = useRef();
  const refTitle = useRef();

  const { currentAudio, status, togglePlayPause } = usePlayer();

  const location = useLocation();

  const thumbnails =
    currentAudio?.info?.thumbnails[currentAudio.info.thumbnails.length - 1]
      ?.url;
  const title = currentAudio?.info?.title;
  const channel = currentAudio?.info?.user;

  useEffect(() => {
    location.pathname.includes("/video/") ? setShow(false) : setShow(true);
  }, [location.pathname]);

  if (status !== "ready" || !show) return <></>;

  return (
    <>
      <div className="fixed bottom-1 right-1/2 w-11/12 translate-x-2/4 h-12 bg-black opacity-70 rounded-lg sm:hidden"></div>
      <div
        ref={refMinPlayer}
        className="fixed bottom-0 right-1/2 w-11/12 translate-x-2/4 h-12 flex items-center gap-2text-white rounded-lg sm:h-64 sm:w-96 sm:bottom-2 sm:right-8 sm:translate-x-0 sm:flex-col sm:bg-black"
      >
        <div className="flex w-2/3 gap-2 sm:w-full sm:gap-0 sm:h-full">
          <Link className="w-1/3 rounded-lg sm:h-full sm:w-full sm:rounded-b-none">
            <img src={thumbnails} alt={title} className="" />
          </Link>
          <div className="w-2/3 text-white flex flex-col justify-around px-2 overflow-hidden sm:hidden">
            <p
              className="text-xs whitespace-nowrap font-bold sm:hidden"
              ref={refTitle}
            >
              {title}
            </p>
            <p className="text-xs sm:hidden">{channel}</p>
          </div>
        </div>

        {status === "ready" && (
          <>
            <Audio />
            <div className="flex justify-around gap-4 w-1/3 mr-2 mb-2 sm:justify-between">
              <ControlPlayer
                togglePlayPause={togglePlayPause}
                currentAudio={currentAudio}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MinPlayer;
