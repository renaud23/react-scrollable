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
          d="M3.704 2.117L6.35 4.233 3.704 6.35H2.117l2.646-2.117-2.646-2.116z"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
