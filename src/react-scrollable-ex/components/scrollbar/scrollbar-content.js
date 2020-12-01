import React, { useCallback } from "react";
import classnames from "classnames";
import { useDispatch } from "../../../commons-scrollable";
import { actions, ScrollableContext } from "../../state-management";
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
  const dispatch = useDispatch(ScrollableContext);

  const onClickCallback = useCallback(
    function (e) {
      e.stopPropagation();
      if (e.button === 0) {
        const { left, top } = e.target.getBoundingClientRect();
        const trackPos = horizontal ? e.clientX - left : e.clientY - top;
        if (horizontal) {
          dispatch(actions.onHorizontalScrollTo({ trackPos }));
        } else {
          dispatch(actions.onVerticalScrollTo({ trackPos }));
        }
      }
    },
    [horizontal, dispatch]
  );

  return (
    <div
      className={classnames("react-scrollbar-ex-content", {
        horizontal,
        vertical: !horizontal,
      })}
      style={getContentStyle(horizontal, contentWidth, ref)}
      onClick={onClickCallback}
    >
      <ScrollbarTrack horizontal={horizontal} scrollbar={scrollbar} />
    </div>
  );
}

export default ScrollbarContent;
