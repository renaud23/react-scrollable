import React, {
  useCallback,
  useReducer,
  useEffect,
  useRef,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { useResizeObserver } from "./common-tools";
import {
  reducers,
  INITIAL_STATE,
  ScrollableContext,
  actions,
} from "./state-management";
import { ScrollbarVertical, ScrollbarHorizontal } from "./scrollbar";
import "./scrollable-container.scss";

const __middleware = (next) => (action) => next(action);

function ScrollableContainer({
  children,
  maxWidth,
  maxHeight,
  verticalScrollPercentRequest,
  horizontalScrollPercentRequest,
  idContent,
  onHorizontalScroll = () => null,
  onVerticalScroll = () => null,
  onResize = () => null,
  middleware = __middleware,
}) {
  const scrollbarVEl = useRef();
  const scrollbarHEl = useRef();
  const [state, __dispatch] = useReducer(reducers, INITIAL_STATE);

  const dispatch = useMemo(
    function () {
      return middleware(__dispatch);
    },
    [__dispatch, middleware]
  );

  const { vertical, horizontal, refresh } = state;
  const { drag: verticalDrag, scrollPercent: verticalPercent } = vertical;
  const { drag: horizontalDrag, scrollPercent: horizontalPercent } = horizontal;

  /* USE CALLBACK */

  const onKeyDownCallback = useCallback(
    function (e) {
      e.stopPropagation();
      e.preventDefault();
      dispatch(actions.onKeyDown(e.key));
    },
    [dispatch]
  );

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
      dispatch(actions.onRefreshViewport());
      onResize(viewportWidth, viewportHeight);
    },
    [dispatch, scrollbarHEl, scrollbarVEl, onResize]
  );

  /* */
  const onMDHcbk = useCallback(
    function (clientPos) {
      dispatch(actions.onHorizontalStartDrag(clientPos));
    },
    [dispatch]
  );
  const onMDVcbk = useCallback(
    function (clientPos) {
      dispatch(actions.onVerticalStartDrag(clientPos));
    },
    [dispatch]
  );
  /* */
  const onBarMouseDownVer = useCallback(
    function (clientPos) {
      dispatch(actions.onVerticalMouseDown(clientPos));
    },
    [dispatch]
  );
  const onBarMouseDownHor = useCallback(
    function (clientPos) {
      dispatch(actions.onHorizontalMouseDown(clientPos));
    },
    [dispatch]
  );

  const onmouseupCbk = useCallback(
    function () {
      if (verticalDrag) {
        dispatch(actions.onVerticalStopDrag());
      }
      if (horizontalDrag) {
        dispatch(actions.onHorizontalStopDrag());
      }
    },
    [verticalDrag, horizontalDrag, dispatch]
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
    [verticalDrag, horizontalDrag, dispatch]
  );

  const onWheelCallback = useCallback(
    function (e) {
      dispatch(actions.onWheel(e.deltaY));
    },
    [dispatch]
  );
  /* USE EFFECT */
  useEffect(
    function () {
      const { percent } = verticalScrollPercentRequest || {};
      dispatch(actions.onVerticalScrollPercentRequest(percent));
    },
    [verticalScrollPercentRequest, dispatch]
  );

  useEffect(
    function () {
      const { percent } = horizontalScrollPercentRequest || {};
      if (percent) {
        dispatch(actions.onHorizontalScrollPercentRequest(percent));
      }
    },
    [horizontalScrollPercentRequest, dispatch]
  );

  /* USE EFFECT */
  useEffect(
    function () {
      if (refresh) onHorizontalScroll(horizontalPercent);
    },
    [horizontalPercent, onHorizontalScroll, refresh]
  );

  useEffect(
    function () {
      if (refresh) onVerticalScroll(verticalPercent);
    },
    [verticalPercent, onVerticalScroll, refresh]
  );

  /* ***** */

  useEffect(
    function () {
      dispatch(actions.onInit(maxWidth, maxHeight));
      dispatch(actions.onRefreshViewport());
    },
    [maxWidth, maxHeight, dispatch]
  );

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

  /* *** */

  const containerEl = useResizeObserver(onResizeCallback);
  return (
    <ScrollableContext.Provider value={[state, dispatch]}>
      <div
        ref={containerEl}
        className="react-scrollable-container"
        tabIndex="-1"
        onWheel={onWheelCallback}
        onKeyDown={onKeyDownCallback}
      >
        <ScrollbarVertical
          ref={scrollbarVEl}
          {...vertical}
          onTrackMouseDown={onMDVcbk}
          onBarMouseDown={onBarMouseDownVer}
          idContent={idContent}
        />
        <ScrollbarHorizontal
          ref={scrollbarHEl}
          {...horizontal}
          onTrackMouseDown={onMDHcbk}
          onBarMouseDown={onBarMouseDownHor}
          idContent={idContent}
        />
        {children}
      </div>
    </ScrollableContext.Provider>
  );
}

ScrollableContainer.propTypes = {
  maxWidth: PropTypes.number.isRequired,
  maxHeight: PropTypes.number.isRequired,
  verticalScrollPercentRequest: PropTypes.shape({
    percent: PropTypes.number.isRequired,
  }),
  horizontalScrollPercentRequest: PropTypes.shape({
    percent: PropTypes.number.isRequired,
  }),
  idContent: PropTypes.string,
  onHorizontalScroll: PropTypes.func,
  onVerticalScroll: PropTypes.func,
  onResize: PropTypes.func,
};

ScrollableContainer.defaultProps = {
  verticalScrollPercentRequest: undefined,
  horizontalScrollPercentRequest: undefined,
  onHorizontalScroll: () => null,
  onVerticalScroll: () => null,
  onResize: () => null,
  idContent: "",
};

export default ScrollableContainer;
