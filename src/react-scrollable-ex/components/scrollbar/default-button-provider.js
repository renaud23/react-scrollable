import React from "react";
import classnames from "classnames";
import * as icons from "../icons";

// function getColor(disabled) {
//   return disabled ? "#aaa" : "#000";
// }

function getIcon({ width, height, type, disabled }) {
  switch (type) {
    case "top":
      return <icons.ArrowTopIcon width={width} height={height} />;
    case "bottom":
      return <icons.ArrowBottomIcon width={width} height={height} />;
    case "right":
      return <icons.ArrowRightIcon width={width} height={height} />;
    case "left":
      return <icons.ArrowLeftIcon width={width} height={height} />;
    default:
      return null;
  }
}

function DefaultButtonProvider({ width, height, type, disabled }) {
  return (
    <div
      className={classnames("react-scrollbar-ex-button", { disabled, type })}
    >
      {getIcon({ width: "100%", height: "100%", type, disabled })}
    </div>
  );
}

export default DefaultButtonProvider;
