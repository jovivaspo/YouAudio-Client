import React from "react";
import SearchIcon from "./icons/SearchIcon";

const SearchButton = ({ size, setActive, handlerSearch }) => {
  return (
    <button className="relative w-8 h-8 flex justify-center items-center sm:border-2 sm:border-gray-500 sm:w-16 sm:h-10 sm:rounded-r-full sm:mr-auto hover:border-blue-700">
      <div
        className="btn-fail absolute top-0 left-0 w-full h-full"
        onClick={(e) => {
          if (size <= 640) return setActive(true);
          handlerSearch(e);
        }}
      ></div>
      <SearchIcon />
    </button>
  );
};

export default SearchButton;
