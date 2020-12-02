import React from "react";

function Icon({ width = 32, height = 32, color = "#000" }) {
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
          fill={color}
          fillOpacity="1"
          stroke="none"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.265"
          d="M4.763 2.117L2.117 4.233 4.763 6.35H6.35L3.704 4.233 6.35 2.117z"
        ></path>
      </g>
    </svg>
  );
}

export default Icon;
