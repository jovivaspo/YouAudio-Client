import * as React from "react";

const PauseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-player-pause"
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
    <rect x={6} y={5} width={4} height={14} rx={1} />
    <rect x={14} y={5} width={4} height={14} rx={1} />
  </svg>
);

export default PauseIcon;
