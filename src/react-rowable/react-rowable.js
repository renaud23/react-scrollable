import React, { useReducer, useCallback } from "react";
import PropTypes from "prop-types";
import { useResizeObserver } from "../commons-scrollable";
import {
  RowableContext,
  reducer,
  INITIAL_STATE,
  actions,
} from "./state-management";
import ReactScrollable from "../react-scrollable-ex";

function emptyCallback(w, h) {
  return [w, h];
}

function ReactRowable({
  children,
  id,
  vertical: verticalRowable,
  horizontal: horizontalRowable,
  onResize: onResizeRoot = emptyCallback,
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { vertical, horizontal, focused } = state;
  const {
    // maxSize: maxHeight,
    // scrollRequest: verticalScrollRequest,
    start: verticalStart,
    margin: marginTop,
    nb: verticalNb,
  } = vertical;
  const {
    // maxSize: maxWidth,
    // scrollRequest: horizontalScrollRequest,
    start: horizontalStart,
    margin: marginLeft,
    nb: horizontalNb,
  } = horizontal;

  /* */
  const onResize = useCallback(
    function (width, height) {
      console.log({ width, height });
      const [w, h] = onResizeRoot(width, height);
      dispatch(actions.onResize(w, h));
      return [w, h];
    },
    [onResizeRoot]
  );
  const containerEl = useResizeObserver(onResize);

  const onVerticalScroll = useCallback(function () {}, []);
  const onHorizontalScroll = useCallback(function () {}, []);

  const onKeyDown = useCallback(function () {}, []);
  const onFocus = useCallback(function () {}, []);
  const onBlur = useCallback(function () {}, []);
  return (
    <RowableContext.Provider value={[state, dispatch]}>
      <ReactScrollable
        onVerticalScroll={onVerticalScroll}
        onHorizontalScroll={onHorizontalScroll}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <div ref={containerEl} className="react-rowable-content-container">
          {React.cloneElement(React.Children.only(children), {
            verticalStart,
            marginTop,
            verticalNb,
            horizontalStart,
            marginLeft,
            horizontalNb,
            focused,
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

ReactScrollable.propTypes = {
  id: PropTypes.string,
  vertical: rowableProps.isRequired,
  horizontal: rowableProps.isRequired,
  onResize: PropTypes.func,
};

ReactScrollable.defaultProps = {};

export default ReactRowable;
