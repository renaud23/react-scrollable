import React, { useReducer, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useResizeObserver } from "../commons-scrollable";
import {
  RowableContext,
  reducer,
  INITIAL_STATE,
  actions,
} from "./state-management";
import ReactScrollable from "../react-scrollable";
import isBindedKey from "./is-binded-key";
import "./react-rowable.scss";

function emptyResizeCallback(w, h) {
  return [w, h];
}

function emptyCallback() {}

function ReactRowable({
  children,
  id,
  className,
  tabIndex,
  vertical: verticalRowable,
  horizontal: horizontalRowable,
  onResize: onResizeRoot = emptyResizeCallback,
  treeSize = false,
  onBlur = emptyCallback,
  onFocus = emptyCallback,
  onKeyDown = emptyCallback,
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { vertical, horizontal } = state;
  const {
    scrollRequest: verticalScrollRequest,
    start: verticalStart,
    size: refHeight,
    margin: marginTop,
    nb: verticalNb,
  } = vertical;
  const {
    scrollRequest: horizontalScrollRequest,
    start: horizontalStart,
    size: refWidth,
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

  const onKeyDownCallback = useCallback(
    function (e) {
      const prevents = onKeyDown(e);
      if (prevents !== false) {
        const { key } = e;
        if (isBindedKey(key)) {
          e.preventDefault();
          dispatch(actions.onKeydown(key));
        }
        return false;
      }
    },
    [onKeyDown]
  );
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
        dispatch(actions.onVerticalScrollRequest(verticalOuterScrollRequest));
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
    <RowableContext.Provider value={[state, dispatch, containerEl]}>
      <ReactScrollable
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        refWidth={refWidth}
        refHeight={refHeight}
        onVerticalScroll={onVerticalScroll}
        onHorizontalScroll={onHorizontalScroll}
        verticalScrollRequest={verticalScrollRequest}
        horizontalScrollRequest={horizontalScrollRequest}
        onFocus={onFocusCallback}
        onBlur={onBlurCallback}
        onKeyDown={onKeyDownCallback}
        className={className}
        idContent={id}
        tabIndex={tabIndex}
      >
        <div className="react-rowable-container" ref={containerEl}>
          {React.cloneElement(React.Children.only(children), {
            verticalStart,
            marginTop,
            verticalNb,
            horizontalStart,
            marginLeft,
            horizontalNb,
          })}
        </div>
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
  tabIndex: PropTypes.oneOf(["0", "-1"]),
};

ReactRowable.defaultProps = {
  id: undefined,
  onBlur: emptyCallback,
  onFocus: emptyCallback,
  tabIndex: "0",
};

export default ReactRowable;
