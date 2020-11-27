import React from "react";
import classnames from "classnames";

function getContentStyle(horizontal, size, ref) {
  if (horizontal) {
    return { width: size, height: ref };
  }
  return { width: ref, height: size };
}

function getTrackStyle(horizontal, scrollbar) {
  const { trackPos, trackSize } = scrollbar;

  if (horizontal) {
    return { marginLeft: trackPos, width: trackSize };
  }
  return { marginTop: trackPos, height: trackSize };
}

function ScrollbarContent({ horizontal, scrollbar }) {
  const { ref, sizeMax } = scrollbar;
  const contentWidth = sizeMax - 2 * ref;

  return (
    <div
      className={classnames("react-scrollbar-ex-content", {
        horizontal,
        vertical: !horizontal,
      })}
      style={getContentStyle(horizontal, contentWidth, ref)}
    >
      <div
        className={classnames("react-scrollbar-ex-track", {
          horizontal,
          vertical: !horizontal,
        })}
        style={getTrackStyle(horizontal, scrollbar)}
      ></div>
    </div>
  );
}

export default ScrollbarContent;
