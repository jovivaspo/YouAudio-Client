import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePlayer } from "../hooks/usePlayer";
import Audio from "./audio";
import CloseButton from "./CloseButton";
import ControlPlayer from "./ControlPlayer";

const MinPlayer = () => {
  const [show, setShow] = useState(false);
  const refMinPlayer = useRef();
  const refTitle = useRef();

  const { currentAudio, status, playlist, togglePlayPause } = usePlayer();

  const location = useLocation();

  const thumbnails =
    currentAudio?.info?.thumbnails[currentAudio.info.thumbnails.length - 1]
      ?.url;
  const title = currentAudio?.info?.title;

  useEffect(() => {
    location.pathname.includes("/video/") || location.pathname.includes("/playlist/") ? setShow(false) : setShow(true);
  }, [location.pathname]);

  /*
  const widthContainerTitle = refTitle?.current?.getBoundingClientRect().width;
  const widthTitle = refTitle?.current?.innerText.length * 7;
  console.log(widthContainerTitle, widthTitle);

  const [animation, setAnimation] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const move = setInterval(() => {
      setAnimation(
        (prev) => {
          let next = prev + 0.1 * direction;
          return next;
        },
        10000,
        direction
      );
      return () => clearInterval(move);
    });
  }, []);

  useEffect(() => {
    if (animation >= widthTitle) return setDirection(-1);
    if (animation <= 0) return setDirection(0);
  }, [animation]);
  */

  if (status !== "ready" || !show) return <></>;

  return (
    <>
      <div className="fixed bottom-1 right-1/2 w-11/12 translate-x-2/4 h-12 bg-black opacity-70 rounded-lg sm:hidden"></div>
      <div
        ref={refMinPlayer}
        className="fixed bottom-0 right-1/2 w-11/12 translate-x-2/4 h-12 flex items-center gap-2text-white rounded-lg sm:h-[274px] sm:w-96 sm:bottom-2 sm:right-8 sm:translate-x-0 sm:flex-col sm:bg-black sm:border-gray-800 sm:border-2"
      >
        <CloseButton/>
        <div className="flex w-2/3 gap-2 sm:w-full  sm:h-full sm:flex-col ">
          <Link
            to={`/video/${currentAudio.id}`}
            className="w-1/4 rounded-lg sm:h-full sm:w-full sm:rounded-b-none"
          >
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
            <Audio />
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
