import React, { useReducer, useEffect, useCallback } from "react";
import ReactScrollable from "../react-scrollable";
import PropTypes from "prop-types";
import {
  ScrollableContext,
  reducer,
  INITIAL_STATE,
  actions,
} from "./state-management";

function onResizeDefaultHook(width, height) {
  return [width, height];
}

function LargeScrollableContainer({
  children,
  id,
  vertical: verticalScrollable,
  horizontal: horizontalScrollable,
  treeSize,
  onResize,
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { horizontal, vertical, focused } = state;
  const {
    maxSize: maxHeight,
    scrollRequest: verticalScrollRequest,
    start: verticalStart,
    margin: marginTop,
    nb: verticalNb,
  } = vertical;
  const {
    maxSize: maxWidth,
    scrollRequest: horizontalScrollRequest,
    start: horizontalStart,
    margin: marginLeft,
    nb: horizontalNb,
  } = horizontal;

  const onResizeCallback = useCallback(
    function (width, height) {
      const [w, h] = onResize(width, height);
      dispatch(actions.onResize(w, h));
      return [w, h];
    },
    [onResize]
  );

  const onVerticalScrollCallback = useCallback(
    function (percent) {
      dispatch(actions.onVerticalScroll(percent));
    },
    [dispatch]
  );

  const onHorizontalScrollCallback = useCallback(
    function (percent) {
      dispatch(actions.onHorizontalScroll(percent));
    },
    [dispatch]
  );

  /* */
  const { scrollRequest: vOuterScrollRequest } = verticalScrollable;
  useEffect(
    function () {
      if (vOuterScrollRequest) {
        if (vOuterScrollRequest) {
          dispatch(actions.onVerticalScrollRequest(vOuterScrollRequest));
        }
      }
    },
    [vOuterScrollRequest]
  );
  useEffect(
    function () {
      dispatch(
        actions.onRefreshVerticalScrollable(verticalScrollable, treeSize)
      );
    },
    [verticalScrollable, treeSize]
  );

  const { scrollRequest: hOuterScrollRequest } = horizontalScrollable;
  useEffect(
    function () {
      if (hOuterScrollRequest) {
        dispatch(actions.onHorizontalScrollRequest(hOuterScrollRequest));
      }
    },
    [hOuterScrollRequest]
  );
  useEffect(
    function () {
      dispatch(
        actions.onRefreshHorizontalScrollable(horizontalScrollable, treeSize)
      );
    },
    [horizontalScrollable, treeSize]
  );

  /* */
  const middleware_ = useCallback(
    (next) => (action) => {
      const { type, payload } = action;
      if (type === "react-scrollable/on-key-down") {
        const { key } = payload;
        dispatch(actions.onKeydown(key));
        return null;
      }
      return next(action);
    },
    [dispatch]
  );

  const onFocusCallback = function () {
    dispatch(actions.onFocus());
  };

  const onBlurCallback = function () {
    dispatch(actions.onBlur());
  };

  return (
    <ScrollableContext.Provider value={[state, dispatch]}>
      <ReactScrollable
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onHorizontalScroll={onHorizontalScrollCallback}
        onVerticalScroll={onVerticalScrollCallback}
        verticalScrollPercentRequest={verticalScrollRequest}
        horizontalScrollPercentRequest={horizontalScrollRequest}
        onResize={onResizeCallback}
        middleware={middleware_}
        idContent={id}
        onFocus={onFocusCallback}
        onBlur={onBlurCallback}
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
    </ScrollableContext.Provider>
  );
}

const scrollableProps = PropTypes.shape({
  max: PropTypes.number,
  maxSize: PropTypes.number,
  cumulsSize: PropTypes.arrayOf(PropTypes.number),
  fixed: PropTypes.bool,
  fixedValue: PropTypes.number,
});

LargeScrollableContainer.propTypes = {
  id: PropTypes.string,
  vertical: scrollableProps.isRequired,
  horizontal: scrollableProps.isRequired,
  treeSize: PropTypes.bool,
  onResize: PropTypes.func,
};

LargeScrollableContainer.defaultProps = {
  id: undefined,
  vertical: {},
  horizontal: {},
  treeSize: false,
  onResize: onResizeDefaultHook,
};

export default LargeScrollableContainer;
