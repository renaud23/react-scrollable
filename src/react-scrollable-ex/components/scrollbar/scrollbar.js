import React, { useContext, useCallback } from "react";
import classnames from "classnames";
import { useResizeObserver } from "../../../commons-scrollable";
import ScrollbarButton from "./scrollbar-button";
import { ScrollableContext, actions } from "../../state-management";
import ScrollbarContent from "./scrollbar-content";

function ScrollbarContentContainer({ horizontal, scrollbar, children }) {
  const { ref, sizeMax } = scrollbar;
  const contentWidth = sizeMax - 2 * ref;
  if (contentWidth > 0) {
    return children;
  }
  return null;
}

function Scrollbar({ horizontal = true }) {
  const [state, dispatch] = useContext(ScrollableContext);
  const { horizontal: hScrollbar, vertical: vScrollbar } = state;
  const scrollbar = horizontal ? hScrollbar : vScrollbar;
  const { trackPos, trackSize, size } = scrollbar;

  const onResizeCallback = useCallback(
    function (width, height) {
      if (horizontal) {
        dispatch(actions.onHorizontalScrollbarResize(width, height));
      } else {
        dispatch(actions.onVerticalScrollbarResize(height, width));
      }
    },
    [horizontal, dispatch]
  );
  const containerEl = useResizeObserver(onResizeCallback);

  return (
    <div
      ref={containerEl}
      className={classnames("react-scrollbar-ex", {
        horizontal,
        vertical: !horizontal,
      })}
    >
      <ScrollbarContentContainer horizontal={horizontal} scrollbar={scrollbar}>
        <ScrollbarButton
          className={horizontal ? "left" : "top"}
          disabled={trackPos === 0}
        />
        <ScrollbarContent horizontal={horizontal} scrollbar={scrollbar} />
        <ScrollbarButton
          className={horizontal ? "right" : "bottom"}
          disabled={trackPos === size - trackSize}
        />
      </ScrollbarContentContainer>
    </div>
  );
}

export default Scrollbar;
