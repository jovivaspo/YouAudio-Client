import React from "react";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import NextIcon from "./icons/NextIcon";
import PrevIcon from "./icons/PrevIcon";
import { useNavigate } from "react-router-dom";

const ControlPlayer = ({ togglePlayPause, currentAudio, playlist }) => {
  const navigate = useNavigate()

  console.log(playlist)

  const handlerNext = () => {
    if(!playlist.id) return navigate(`/video/${currentAudio.videosRelated[0].id}`)

    const item = playlist.items.findIndex(el=> currentAudio.id === el.id)

    if(item === -1 ) return navigate(`/video/${currentAudio.videosRelated[0].id}`)

    return navigate(`/playlist/${playlist.id}/${playlist.items[item + 1].id}`)
  }

  const handlerPrev = () => {
    if(!playlist.id) return navigate(`/video/${currentAudio.videosRelated[currentAudio.videosRelated.length -1 ].id}`)

    const item = playlist.items.findIndex(el=> currentAudio.id === el.id)

    if(item === -1 || !playlist.id) return navigate(`/video/${currentAudio.videosRelated[currentAudio.videosRelated.length -1 ].id}`)

    if(item === 0 ) return navigate(`/playlist/${playlist.id}/${playlist.items[playlist.items.length - 1].id}`)

    return navigate(`/playlist/${playlist.id}/${playlist.items[item -1 ].id}`)
  }

  return (
    <>
      <button onClick={handlerPrev}>
        <PrevIcon />
      </button>
      <button onClick={togglePlayPause}>
        {currentAudio.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button onClick={handlerNext}>
        <NextIcon />
      </button>
    </>
  );
};

export default ControlPlayer;
