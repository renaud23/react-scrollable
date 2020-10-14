import React, { useCallback, useEffect, useReducer } from "react";
import ScrollableContainer from "../react-scrollable";
import * as actions from "./actions";
import { OffsetChar } from "../commons-scrollable";
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
    verticalScrollPercentRequest,
    horizontalScrollPercentRequest,
    id,
  } = state;

  const onKeyDownCallback = useCallback(function (e) {
    if (e.key === "ArrowDown") {
      dispatch(actions.onArrowDown());
    } else if (e.key === "ArrowUp") {
      dispatch(actions.onArrowUp());
    } else if (e.key === "ArrowLeft") {
      dispatch(actions.onArrowLeft());
    } else if (e.key === "ArrowRight") {
      dispatch(actions.onArrowRight());
    } else if (e.key === "PageUp") {
      dispatch(actions.onPageUp());
    } else if (e.key === "PageDown") {
      dispatch(actions.onPageDown());
    }
  }, []);

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

  return (
    <div
      className="react-large-text"
      onKeyDown={onKeyDownCallback}
      tabIndex="0"
      id={id}
    >
      <ScrollableContainer
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onHorizontalScroll={onHorizontalScroll}
        onVerticalScroll={onVerticalScroll}
        verticalScrollPercentRequest={verticalScrollPercentRequest}
        horizontalScrollPercentRequest={horizontalScrollPercentRequest}
        onResize={onResizeCallback}
        idContent={id}
      >
        <ScrollableContent
          nbLines={nbLines}
          lines={value}
          startLine={startLine}
          lineHeight={lineHeight}
          marginTop={marginTop}
          marginLeft={marginLeft}
          maxWidth={maxWidth}
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
  maxWidth,
}) {
  const el = nbLines
    ? new Array(nbLines).fill(null).map(function (_, i) {
        const content = lines[startLine + i];
        return (
          <div
            className="react-large-text-line"
            style={{ height: lineHeight, width: maxWidth }}
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
