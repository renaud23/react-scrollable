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
          d="M2.117 3.704L4.233 6.35 6.35 3.704V2.117L4.233 4.763 2.117 2.117z"
        ></path>
      </g>
    </svg>
  );
}

export default React.memo(Icon);
