import React from "react";
import classnames from "classnames";
import ScrollbarTrack from "./scrollbar-track";

function getContentStyle(horizontal, size, ref) {
  if (horizontal) {
    return { width: size, height: ref };
  }
  return { width: ref, height: size };
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
      <ScrollbarTrack horizontal={horizontal} scrollbar={scrollbar} />
    </div>
  );
}

export default ScrollbarContent;
