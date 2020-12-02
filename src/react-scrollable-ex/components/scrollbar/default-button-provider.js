import React from "react";
import * as icons from "../icons";

function getColor(disabled) {
  return disabled ? "#aaa" : "#000";
}

function DefaultButtonProvider({ width, height, type, disabled }) {
  switch (type) {
    case "top":
      return (
        <icons.ArrowTopIcon
          width={width}
          height={height}
          color={getColor(disabled)}
        />
      );
    case "bottom":
      return (
        <icons.ArrowBottomIcon
          width={width}
          height={height}
          color={getColor(disabled)}
        />
      );
    case "right":
      return (
        <icons.ArrowRightIcon
          width={width}
          height={height}
          color={getColor(disabled)}
        />
      );
    case "left":
      return (
        <icons.ArrowLeftIcon
          width={width}
          height={height}
          color={getColor(disabled)}
        />
      );
    default:
      return null;
  }
}

export default DefaultButtonProvider;
