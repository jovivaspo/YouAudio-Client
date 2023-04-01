import React from "react";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import NextIcon from "./icons/NextIcon";
import PrevIcon from "./icons/PrevIcon";
import { useLocation, useNavigate } from "react-router-dom";

const ControlPlayer = ({
  togglePlayPause,
  startAudio,
  currentAudio,
  playlist,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlerNext = () => {
    let next = "";
    if (playlist.id) {
      const indexInPlay = playlist.items.findIndex(
        (el) => currentAudio.id === el.id
      );
      if (indexInPlay === playlist.items.length - 1) {
        next = playlist.items[0].id;
        startAudio({ id: next });
      } else {
        next = playlist.items[indexInPlay + 1].id;
        startAudio({ id: next });
      }
    } else {
      next = currentAudio.videosRelated[0].id;
      startAudio({ id: next });
    }

    if (location.pathname.includes("/video/")) {
      navigate(`/video/${next}`);
    }
  };

  const handlerPrev = () => {
    let next = "";
    if (playlist.id) {
      const indexInPlay = playlist.items.findIndex(
        (el) => currentAudio.id === el.id
      );
      if (indexInPlay === 0) {
        next = playlist.items[playlist.items.length - 1].id;
        startAudio({ id: next });
      } else {
        next = playlist.items[indexInPlay - 1].id;
        startAudio({ id: next });
      }
    } else {
      next =
        currentAudio.videosRelated[currentAudio.videosRelated.length - 1].id;
      startAudio({
        id: next,
      });
    }

    if (location.pathname.includes("/video/")) {
      navigate(`/video/${next}`);
    }
  };

  return (
    <>
      <button>
        <PrevIcon onClick={handlerPrev} />
      </button>
      <button onClick={togglePlayPause}>
        {currentAudio.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button>
        <NextIcon onClick={handlerNext} />
      </button>
    </>
  );
};

export default ControlPlayer;
