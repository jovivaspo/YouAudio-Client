import * as React from "react";

const PlaylistIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-playlist"
    width={26}
    height={26}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#fff"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <circle cx={14} cy={17} r={3} />
    <path d="M17 17V4h4M13 5H3M3 9h10M9 13H3" />
  </svg>
);

export default PlaylistIcon;
