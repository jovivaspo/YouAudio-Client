import React from "react";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import NextIcon from "./icons/NextIcon";
import PrevIcon from "./icons/PrevIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

const ControlPlayer = ({ togglePlayPause, currentAudio, playlist }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  /*
  const handlerNext = async () => {
    if (location.pathname.includes("/video/"))
      return navigate(`/video/${currentAudio.videosRelated[0].id}`);
    const item = playlist?.items?.findIndex((el) => currentAudio.id === el.id);
    if (
      location.pathname.includes("/playlist/") &&
      playlist?.items?.length > 0
    ) {
      if (item === item.length - 1)
        return dispatch(onPlaying({ isPlaying: false }));
      else {
        navigate(`/playlist/${playlist.id}/${playlist.items[item + 1].id}`);
      }
    }

    if (item === -1 || !playlist.id)
      return dispatch(onChangeAudio({ id: currentAudio.videosRelated[0].id }));
    if (item === item.length - 1)
      return dispatch(onPlaying({ isPlaying: false }));
    else {
      return dispatch(onChangeAudio({ id: playlist.items[item + 1].id }));
    }
  };

  const handlerPrev = () => {
    if (location.pathname.includes("/video/"))
      return navigate(
        `/video/${
          currentAudio.videosRelated[currentAudio.videosRelated.length - 1].id
        }`
      );
    const item = playlist?.items?.findIndex((el) => currentAudio.id === el.id);
    if (
      location.pathname.includes("/playlist/") &&
      playlist?.items?.length > 0
    ) {
      if (item === 0)
        navigate(
          `/playlist/${playlist.id}/${
            playlist.items[playlist.items.length - 1].id
          }`
        );
      else {
        navigate(`/playlist/${playlist.id}/${playlist.items[item - 1].id}`);
      }
    }

    if (item === -1 || !playlist.id)
      return dispatch(
        onChangeAudio({
          id: currentAudio.videosRelated[currentAudio.videosRelated.length - 1]
            .id,
        })
      );
    if (item === 0)
      returndispatch(
        onChangeAudio({ id: playlist.items[playlist.items.length - 1].id })
      );
    else {
      return dispatch(onChangeAudio({ id: playlist.items[item - 1].id }));
    }
  };
  */

  return (
    <>
      <button>
        <PrevIcon />
      </button>
      <button onClick={togglePlayPause}>
        {currentAudio.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button>
        <NextIcon />
      </button>
    </>
  );
};

export default ControlPlayer;
