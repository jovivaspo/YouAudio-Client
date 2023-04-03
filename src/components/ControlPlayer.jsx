import React, { useEffect, useState } from "react";
import PauseIcon from "./icons/PauseIcon";
import PlayIcon from "./icons/PlayIcon";
import NextIcon from "./icons/NextIcon";
import PrevIcon from "./icons/PrevIcon";


const ControlPlayer = ({

  togglePlayPause,
  handlerNext,
  handlerPrev,

  currentAudio,

}) => {


  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(()=>{
    if(currentAudio.url) return setIsDisabled(false)
    setIsDisabled(true)
  },[currentAudio.url])

  return (
    <>
      <button disabled={isDisabled} onClick={handlerPrev} >
        <PrevIcon />
      </button>
      <button onClick={togglePlayPause} disabled={isDisabled}>
        {currentAudio.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button disabled={isDisabled}  onClick={handlerNext} >
        <NextIcon/>
      </button>
    </>
  );
};

export default ControlPlayer;
