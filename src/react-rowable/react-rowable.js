import React, { useReducer, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useResizeObserver } from "../commons-scrollable";
import {
  RowableContext,
  reducer,
  INITIAL_STATE,
  actions,
} from "./state-management";
import ReactScrollable from "../react-scrollable-ex";

function emptyResizeCallback(w, h) {
  return [w, h];
}

function emptyCallback() {
  // console.log("blur/focus");
}

function ReactRowable({
  children,
  id,
  vertical: verticalRowable,
  horizontal: horizontalRowable,
  onResize: onResizeRoot = emptyResizeCallback,
  treeSize = false,
  onBlur = emptyCallback,
  onFocus = emptyCallback,
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { vertical, horizontal, focused } = state;
  const {
    scrollRequest: verticalScrollRequest,
    start: verticalStart,
    margin: marginTop,
    nb: verticalNb,
  } = vertical;
  const {
    scrollRequest: horizontalScrollRequest,
    start: horizontalStart,
    margin: marginLeft,
    nb: horizontalNb,
  } = horizontal;
  const {
    maxSize: maxHeight,
    scrollRequest: verticalOuterScrollRequest,
  } = verticalRowable;
  const {
    maxSize: maxWidth,
    scrollRequest: horizontalOuterScrollRequest,
  } = horizontalRowable;
  /* */
  const onResize = useCallback(
    function (width, height) {
      const [w, h] = onResizeRoot(width, height);
      dispatch(actions.onResize(w, h));
      return [w, h];
    },
    [onResizeRoot]
  );
  const containerEl = useResizeObserver(onResize);

  const onVerticalScroll = useCallback(
    function (percent) {
      dispatch(actions.onVerticalScroll(percent));
    },
    [dispatch]
  );
  const onHorizontalScroll = useCallback(
    function (percent) {
      dispatch(actions.onHorizontalScroll(percent));
    },
    [dispatch]
  );

  const onKeyDown = useCallback(function () {}, []);
  const onFocusCallback = useCallback(
    function () {
      onFocus();
    },
    [onFocus]
  );
  const onBlurCallback = useCallback(
    function () {
      onBlur();
    },
    [onBlur]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshVerticalRowable(verticalRowable, treeSize));
    },
    [verticalRowable, treeSize]
  );
  useEffect(
    function () {
      dispatch(actions.onRefreshHorizontalRowable(horizontalRowable, treeSize));
    },
    [horizontalRowable, treeSize]
  );
  useEffect(
    function () {
      if (verticalOuterScrollRequest) {
        dispatch(actions.onHorizontalScrollRequest(verticalOuterScrollRequest));
      }
    },
    [verticalOuterScrollRequest]
  );
  useEffect(
    function () {
      if (horizontalOuterScrollRequest) {
        dispatch(
          actions.onHorizontalScrollRequest(horizontalOuterScrollRequest)
        );
      }
    },
    [horizontalOuterScrollRequest]
  );

  return (
    <RowableContext.Provider value={[state, dispatch]}>
      <ReactScrollable
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onVerticalScroll={onVerticalScroll}
        onHorizontalScroll={onHorizontalScroll}
        verticalScrollRequest={verticalScrollRequest}
        horizontalScrollRequest={horizontalScrollRequest}
        onFocus={onFocusCallback}
        onBlur={onBlurCallback}
        onKeyDown={onKeyDown}
        ref={containerEl}
      >
        {React.cloneElement(React.Children.only(children), {
          verticalStart,
          marginTop,
          verticalNb,
          horizontalStart,
          marginLeft,
          horizontalNb,
          focused,
        })}
      </ReactScrollable>
    </RowableContext.Provider>
  );
}

const rowableProps = PropTypes.shape({
  max: PropTypes.number,
  maxSize: PropTypes.number,
  cumulsSize: PropTypes.arrayOf(PropTypes.number),
  fixed: PropTypes.bool,
  fixedValue: PropTypes.number,
});

ReactRowable.propTypes = {
  id: PropTypes.string,
  vertical: rowableProps.isRequired,
  horizontal: rowableProps.isRequired,
  onResize: PropTypes.func,
};

ReactScrollable.defaultProps = {
  onBlur: emptyCallback,
  onFocus: emptyCallback,
};

export default ReactRowable;
