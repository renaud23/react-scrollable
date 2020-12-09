import React, { useCallback } from "react";
import classnames from "classnames";
import { useDispatch } from "../../../commons-scrollable";
import { actions, ScrollableContext } from "../../state-management";
import ScrollbarTrack from "./scrollbar-track";

const ScrollbarContent = React.forwardRef(function (
  { horizontal, scrollbar },
  containerEl
) {
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
      onClick={onClickCallback}
      ref={containerEl}
    >
      <ScrollbarTrack horizontal={horizontal} scrollbar={scrollbar} />
    </div>
  );
});

export default ScrollbarContent;
