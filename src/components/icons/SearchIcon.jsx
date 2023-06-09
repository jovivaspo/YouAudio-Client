import * as React from "react";

const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-search"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="rgb(75,85,99)"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <circle cx={10} cy={10} r={7} />
    <path d="m21 21-6-6" />
  </svg>
);

export default SearchIcon;
