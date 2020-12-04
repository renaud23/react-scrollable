import React from "react";

function Icon({ width = 32, height = 32 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      version="1.1"
      viewBox="0 0 8.467 8.467"
    >
      <g>
        <path
          fillOpacity="1"
          stroke="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.265"
          d="M2.117 4.763l2.116-2.646L6.35 4.763V6.35L4.233 3.704 2.117 6.35z"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
