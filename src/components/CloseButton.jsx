import React from "react";
import { usePlayer } from "../hooks/usePlayer";
import CloseIcon from "./icons/CloseIcon";

const CloseButton = () => {
  const { currentAudio, resetAudio } = usePlayer();

  const handlerClose = () => {
    resetAudio({ id: currentAudio.id });
  };

  return (
    <button
      onClick={handlerClose}
      className="hidden sm: relative sm:absolute sm:top-2 right-2 sm:flex sm:w-6 sm:h-6"
    >
      <CloseIcon className="absolute top-0 z-10 " />
      <div className="absolute top-0 w-full h-full bg-black opacity-5 rounded-full"></div>
    </button>
  );
};

export default CloseButton;
