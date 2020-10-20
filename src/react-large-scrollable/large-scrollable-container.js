import React, { useReducer, useEffect, useCallback } from "react";
import ReactScrollable from "../react-scrollable";
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
  onResize = onResizeDefaultHook,
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { horizontal, vertical } = state;
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

  useEffect(
    function () {
      dispatch(
        actions.onRefreshVerticalScrollable(verticalScrollable, treeSize)
      );
    },
    [verticalScrollable, treeSize]
  );

  useEffect(
    function () {
      dispatch(
        actions.onRefreshHorizontalScrollable(horizontalScrollable, treeSize)
      );
    },
    [horizontalScrollable, treeSize]
  );

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
      >
        {React.cloneElement(React.Children.only(children), {
          verticalStart,
          marginTop,
          verticalNb,
          horizontalStart,
          marginLeft,
          horizontalNb,
        })}
      </ReactScrollable>
    </ScrollableContext.Provider>
  );
}

LargeScrollableContainer.defaultProps = {
  vertical: {},
  horizontal: {},
  treeSize: false,
};

export default LargeScrollableContainer;
