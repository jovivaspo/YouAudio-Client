import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePlayer } from "../hooks/usePlayer";
import CloseButton from "./CloseButton";
import ControlPlayer from "./ControlPlayer";
import converter from "../assets/converter.svg";
import { useDispatch } from "react-redux";

const MinPlayer = () => {
  const [show, setShow] = useState(false);
  const refMinPlayer = useRef();
  const refTitle = useRef();

  const { currentAudio, status, playlist, loadInfo, togglePlayPause } =
    usePlayer();

  const location = useLocation();

  const thumbnails =
    currentAudio?.info?.thumbnails[currentAudio.info.thumbnails.length - 1]
      ?.url;
  const title = currentAudio?.info?.title;

  useEffect(() => {
    location.pathname.includes("/video/") ||
    location.pathname.includes("/playlist/")
      ? setShow(false)
      : setShow(true);
  }, [location.pathname]);

  useEffect(() => {
    if (status !== "change-audio" || !currentAudio.next) return;
    loadInfo({ id: currentAudio.next });
  }, [status]);

  if (!show || status === null) return <></>;

  return (
    <>
      <div className="fixed bottom-1 right-1/2 w-11/12 translate-x-2/4 h-12 bg-black opacity-70 rounded-lg sm:hidden"></div>
      <div
        ref={refMinPlayer}
        className="fixed bottom-0 right-1/2 w-11/12 translate-x-2/4 h-12 flex items-center gap-2text-white rounded-lg sm:h-[274px] sm:w-96 sm:bottom-2 sm:right-8 sm:translate-x-0 sm:flex-col sm:bg-black sm:border-gray-800 sm:border-2"
      >
        <CloseButton />

        <div className="flex w-2/3 gap-2 sm:w-full  sm:h-full sm:flex-col ">
          <Link
            to={`/video/${currentAudio.id}`}
            className=" relative w-1/4 rounded-lg sm:h-full sm:w-full sm:rounded-b-none"
          >
            {status !== "ready" && (
              <div className="h-full w-full absolute top-0 left-0 bg-black opacity-60 flex justify-center items-center ">
                <img
                  src={converter}
                  alt="Convirtiendo vídeo"
                  className="w-8 sm:w-20"
                />
              </div>
            )}
            <img src={thumbnails} alt={title} className="sm:rounded-t-lg" />
          </Link>
          <div className="w-3/4 text-white flex flex-col justify-around px-2 overflow-hidden sm:w-full">
            <p
              className="text-xs whitespace-nowrap font-bold overflow-hidden"
              ref={refTitle}
            >
              {title}
            </p>
          </div>
        </div>

        {status === "ready" && (
          <>
            <div className="flex justify-around i gap-4 w-1/3 mr-2 sm:justify-between sm:mt-1 sm:pb-1">
              <ControlPlayer
                togglePlayPause={togglePlayPause}
                currentAudio={currentAudio}
                playlist={playlist}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MinPlayer;
