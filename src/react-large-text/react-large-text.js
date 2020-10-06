import React, { useCallback, useEffect, useReducer } from "react";
import { ScrollableContainer } from "../react-scrollable";
import { useResizeObserver } from "../react-scrollable";
import * as actions from "./actions";
import OffsetChar from "../offset-char";
import reducer, { INITIAL_STATE } from "./reducer";
import "./react-large-text.scss";

function ReactLargeText({ value, lineHeight, offsetChar }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    maxWidth,
    maxHeight,
    viewportHeight,
    nbLines,
    startLine,
    marginTop,
    marginLeft,
  } = state;

  const onResizeCallback = useCallback(function (width, height) {
    dispatch(actions.onResize(width, height));
  }, []);

  const onHorizontalScroll = useCallback(function (percent) {
    dispatch(actions.onHorizontalScroll(percent));
  }, []);
  const onVerticalScroll = useCallback(function (percent) {
    dispatch(actions.onVerticalScroll(percent));
  }, []);

  useEffect(
    function () {
      dispatch(actions.onInit({ lines: value, lineHeight, offsetChar }));
    },
    [value, lineHeight, offsetChar]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshViewportSize());
    },
    [value, lineHeight, viewportHeight]
  );
  const containerEl = useResizeObserver(onResizeCallback);
  return (
    <div className="react-large-text" ref={containerEl}>
      <ScrollableContainer
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onHorizontalScroll={onHorizontalScroll}
        onVerticalScroll={onVerticalScroll}
      >
        <ScrollableContent
          nbLines={nbLines}
          lines={value}
          startLine={startLine}
          lineHeight={lineHeight}
          marginTop={marginTop}
          marginLeft={marginLeft}
        />
      </ScrollableContainer>
    </div>
  );
}

function ScrollableContent({
  lines,
  startLine,
  nbLines,
  lineHeight,
  marginTop,
  marginLeft,
}) {
  const el = nbLines
    ? new Array(nbLines).fill(null).map(function (_, i) {
        const content = lines[startLine + i];
        return (
          <div
            className="react-large-text-line"
            style={{ maxHeight: lineHeight }}
            key={i}
          >
            {content}
          </div>
        );
      })
    : null;

  return (
    <div
      className="react-large-text-content"
      style={{ marginTop: `${marginTop || 0}px`, marginLeft: marginLeft || 0 }}
    >
      {el}
    </div>
  );
}

export default ({ value, lineHeight }) => {
  return (
    <OffsetChar>
      <ReactLargeText value={value} lineHeight={lineHeight} />
    </OffsetChar>
  );
};
