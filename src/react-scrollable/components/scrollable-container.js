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
  onHorizontalScroll = () => null,
  onVerticalScroll = () => null,
}) {
  const scrollbarVEl = useRef();
  const scrollbarHEl = useRef();
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);
  const { vertical, horizontal } = state;
  const {
    drag: verticalDrag,
    scrollPercent: verticalPercent,
    size: verticalSize,
  } = vertical;
  const {
    drag: horizontalDrag,
    scrollPercent: horizontalPercent,
    size: horizontalSize,
  } = horizontal;

  /* USE CALLBACK */

  const onResizeCallback = useCallback(
    function (viewportWidth, viewportHeight) {
      const { width } = scrollbarHEl.current
        ? scrollbarHEl.current.getBoundingClientRect()
        : {};

      const { height } = scrollbarVEl.current
        ? scrollbarVEl.current.getBoundingClientRect()
        : {};

      dispatch(
        actions.onResize({ width, height, viewportWidth, viewportHeight })
      );
    },
    [dispatch, scrollbarHEl, scrollbarVEl]
  );

  /* */
  const onMDHcbk = useCallback(function (clientPos) {
    dispatch(actions.onHorizontalStartDrag(clientPos));
  }, []);
  const onMDVcbk = useCallback(function (clientPos) {
    dispatch(actions.onVerticalStartDrag(clientPos));
  }, []);
  /* */
  const onBarMouseDownVer = useCallback(function (clientPos) {
    dispatch(actions.onVerticalMouseDown(clientPos));
  }, []);
  const onBarMouseDownHor = useCallback(function (clientPos) {
    dispatch(actions.onHorizontalMouseDown(clientPos));
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
  useEffect(
    function () {
      onHorizontalScroll(horizontalPercent);
    },
    [horizontalPercent, onHorizontalScroll]
  );

  useEffect(
    function () {
      onVerticalScroll(verticalPercent);
    },
    [verticalPercent, onVerticalScroll]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshViewport());
    },
    [verticalSize, horizontalSize, maxWidth, maxHeight]
  );

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
      <div ref={containerEl} className="react-scrollable-container">
        <ScrollbarVertical
          ref={scrollbarVEl}
          {...vertical}
          onTrackMouseDown={onMDVcbk}
          onBarMouseDown={onBarMouseDownVer}
        />
        <ScrollbarHorizontal
          ref={scrollbarHEl}
          {...horizontal}
          onTrackMouseDown={onMDHcbk}
          onBarMouseDown={onBarMouseDownHor}
        />
        {children}
      </div>
    </ScrollableContext.Provider>
  );
}

export default ScrollableContainer;
