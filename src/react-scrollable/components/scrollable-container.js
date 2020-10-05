import React, { useCallback, useReducer, useEffect, useRef } from "react";
import { useResizeObserver } from "./common-tools";
import {
  reducers,
  INITIAL_STATE,
  ScrollableContext,
  actions,
} from "./state-management";
import { ScrollbarVertical, ScrollbarHorizontal } from "./scrollbar";
import "./scrollable-container.scss";

function ScrollableContainer({
  children,
  maxWidth,
  maxHeight,
  onKeyDown,
  onWheel,
}) {
  const scrollbarVEl = useRef();
  const scrollbarHEl = useRef();
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);
  const { vertical, horizontal } = state;
  const { drag: verticalDrag } = vertical;
  const { drag: horizontalDrag } = horizontal;

  /* USE CALLBACK */

  const onResizeCallback = useCallback(
    function () {
      const { width } = scrollbarHEl.current
        ? scrollbarHEl.current.getBoundingClientRect()
        : {};

      const { height } = scrollbarVEl.current
        ? scrollbarVEl.current.getBoundingClientRect()
        : {};

      dispatch(actions.onResize(width, height));
    },
    [dispatch, scrollbarHEl, scrollbarVEl]
  );

  const onMDHcbk = useCallback(function (clientPos) {
    dispatch(actions.onHorizontalStartDrag(clientPos));
  }, []);
  const onMDVcbk = useCallback(function (clientPos) {
    dispatch(actions.onVerticalStartDrag(clientPos));
  }, []);

  const onmouseupCbk = useCallback(
    function () {
      if (verticalDrag) {
        dispatch(actions.onVerticalStopDrag());
      }
      if (horizontalDrag) {
        dispatch(actions.onHorizontalStopDrag());
      }
    },
    [verticalDrag, horizontalDrag]
  );
  const onmousemoveCbk = useCallback(
    function (e) {
      if (verticalDrag) {
        e.stopPropagation();
        dispatch(actions.onVerticalDrag(e.clientY));
      }
      if (horizontalDrag) {
        e.stopPropagation();
        dispatch(actions.onHorizontalDrag(e.clientX));
      }
    },
    [verticalDrag, horizontalDrag]
  );

  /* USE EFFECT */

  // useEffect(function () {}, []);

  useEffect(
    function () {
      window.addEventListener("mouseup", onmouseupCbk);
      window.addEventListener("mousemove", onmousemoveCbk);
      return function () {
        window.removeEventListener("mouseup", onmouseupCbk);
        window.removeEventListener("mousemove", onmousemoveCbk);
      };
    },
    [onmouseupCbk, onmousemoveCbk]
  );

  /* ***** */

  useEffect(
    function () {
      dispatch(actions.onInit(maxWidth, maxHeight));
    },
    [maxWidth, maxHeight]
  );

  /* *** */

  const containerEl = useResizeObserver(onResizeCallback);
  return (
    <ScrollableContext.Provider value={[state, dispatch]}>
      <div
        ref={containerEl}
        className="react-scrollable-container"
        onWheel={() => null}
        onKeyDown={() => null}
      >
        <ScrollbarVertical
          ref={scrollbarVEl}
          {...vertical}
          onMouseDown={onMDVcbk}
        />
        <ScrollbarHorizontal
          ref={scrollbarHEl}
          {...horizontal}
          onMouseDown={onMDHcbk}
        />
        {children}
      </div>
    </ScrollableContext.Provider>
  );
}

export default ScrollableContainer;
