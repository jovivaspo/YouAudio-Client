import React from "react";
import MenuIcon from "./icons/MenuIcon";

const MenuButton = ({ setOpen, open }) => {
  return (
    <button className="relative">
      <div
        className="btn-fail absolute top-0 left-0 w-full h-full"
        onClick={() => setOpen(!open)}
      ></div>
      <MenuIcon />
    </button>
  );
};

export default MenuButton;
