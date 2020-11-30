import React, { useCallback, useEffect, useState } from "react";
import classnames from "classnames";
import { useDispatch } from "../../../commons-scrollable";
import { actions, ScrollableContext } from "../../state-management";

function getStyle(horizontal, scrollbar) {
  const { trackPos, trackSize } = scrollbar;

  if (horizontal) {
    return { marginLeft: trackPos, width: trackSize };
  }
  return { marginTop: trackPos, height: trackSize };
}

function ScrollbarTrack({ horizontal, scrollbar }) {
  const dispatch = useDispatch(ScrollableContext);

  const [drag, setDrag] = useState(false);
  const [clientPos, setClientPos] = useState(undefined);

  const onMouseDownCallback = useCallback(
    function (e) {
      e.stopPropagation();
      if (e.button === 0) {
        setDrag(true);
        const clientPos = horizontal ? e.clientX : e.clientY;
        setClientPos(clientPos);
      }
    },
    [horizontal]
  );
  const onMouseMoveCallback = useCallback(
    function (e) {
      if (drag) {
        const next = horizontal ? e.clientX : e.clientY;
        if (next !== clientPos) {
          setClientPos(next);
          if (horizontal) {
            dispatch(actions.onHorizontalScroll(next - clientPos));
          } else {
            dispatch(actions.onVerticalScroll(next - clientPos));
          }
        }
      }
    },
    [clientPos, drag, horizontal, dispatch]
  );
  const onMouseUpCallback = useCallback(
    function () {
      if (drag) {
        setDrag(false);
        setClientPos(undefined);
      }
    },
    [drag]
  );

  useEffect(
    function () {
      document.addEventListener("mousemove", onMouseMoveCallback);
      document.addEventListener("mouseup", onMouseUpCallback);
      return () => {
        document.removeEventListener("mousemove", onMouseMoveCallback);
        document.removeEventListener("mouseup", onMouseUpCallback);
      };
    },
    [onMouseMoveCallback, onMouseUpCallback]
  );

  return (
    <div
      className={classnames("react-scrollbar-ex-track", {
        horizontal,
        vertical: !horizontal,
        drag,
      })}
      style={getStyle(horizontal, scrollbar)}
      onMouseDown={onMouseDownCallback}
    ></div>
  );
}

export default ScrollbarTrack;
