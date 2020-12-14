import React, { useContext, useCallback, useState } from "react";
import ScrollbarContainer from "./scrollbar-container";
import { useResizeObserver } from "../../../commons-scrollable";
import ScrollbarButton from "./scrollbar-button";
import { ScrollableContext, actions } from "../../state-management";
import ScrollbarContent from "./scrollbar-content";
import { BUTTON_TYPES } from "./scrollbar-button";

function Scrollbar({ horizontal, buttonProvider }) {
  const [state, dispatch] = useContext(ScrollableContext);
  const [drag, setDrag] = useState(false);
  const { horizontal: hScrollbar, vertical: vScrollbar, idContent } = state;
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
    <ScrollbarContainer
      horizontal={horizontal}
      idContent={idContent}
      scrollbar={scrollbar}
      drag={drag}
    >
      <ScrollbarButton
        type={horizontal ? BUTTON_TYPES.left : BUTTON_TYPES.top}
        disabled={trackPos === 0 || trackSize === undefined}
        buttonProvider={buttonProvider}
      />
      <ScrollbarContent
        horizontal={horizontal}
        scrollbar={scrollbar}
        ref={containerEl}
        setDrag={setDrag}
        drag={drag}
      />
      <ScrollbarButton
        type={horizontal ? BUTTON_TYPES.right : BUTTON_TYPES.bottom}
        disabled={trackPos === size - trackSize || trackSize === undefined}
        buttonProvider={buttonProvider}
      />
    </ScrollbarContainer>
  );
}

export default Scrollbar;
