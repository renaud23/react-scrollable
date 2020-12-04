import React, { useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import {
  reducer,
  INITIAL_STATE,
  ScrollableContext,
  actions,
} from "./state-management";
import {
  ScrollableContainer,
  HorizontalScrollbar,
  VerticalScrollbar,
} from "./components";
import { DefaultButtonProvider } from "./components";
import "./react-scrollable-ex.scss";
import { Corner } from "./components";

function emptyCallback() {}

function ReactScrollableEx({
  children,
  maxWidth,
  maxHeight,
  onHorizontalScroll,
  onVerticalScroll,
  verticalScrollRequest,
  horizontalScrollRequest,
  focused,
  className,
  buttonProvider = DefaultButtonProvider,
  onFocus = emptyCallback,
  onBlur = emptyCallback,
  onKeyDown = emptyCallback,
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { vertical, horizontal } = state;
  const { percent: vp } = vertical;
  const { percent: hp } = horizontal;

  useEffect(
    function () {
      onVerticalScroll(vp);
    },
    [vp, onVerticalScroll]
  );

  useEffect(
    function () {
      onHorizontalScroll(hp);
    },
    [hp, onHorizontalScroll]
  );

  useEffect(
    function () {
      dispatch(actions.onUpdateProps({ maxWidth, maxHeight, focused }));
    },
    [maxWidth, maxHeight, focused]
  );

  useEffect(
    function () {
      if (verticalScrollRequest) {
        const { percent } = verticalScrollRequest;
        dispatch(actions.onVerticalScrollTo({ percent }));
      }
    },
    [verticalScrollRequest, dispatch]
  );

  useEffect(
    function () {
      if (horizontalScrollRequest) {
        const { percent } = horizontalScrollRequest;
        dispatch(actions.onHorizontalScrollTo({ percent }));
      }
    },
    [horizontalScrollRequest, dispatch]
  );

  return (
    <ScrollableContext.Provider value={[state, dispatch]}>
      <ScrollableContainer
        className={className}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      >
        <HorizontalScrollbar buttonProvider={buttonProvider} />
        <VerticalScrollbar buttonProvider={buttonProvider} />
        <Corner />
        {children}
      </ScrollableContainer>
    </ScrollableContext.Provider>
  );
}

ReactScrollableEx.propTypes = {
  maxWidth: PropTypes.number.isRequired,
  maxHeight: PropTypes.number.isRequired,
  onHorizontalScroll: PropTypes.func.isRequired,
  onVerticalScroll: PropTypes.func.isRequired,
  verticalScrollRequest: PropTypes.shape({
    percent: PropTypes.number.isRequired,
  }),
  horizontalScrollRequest: PropTypes.shape({
    percent: PropTypes.number.isRequired,
  }),
  focused: PropTypes.bool,
  buttonProvider: PropTypes.func,
  className: PropTypes.string,
};

ReactScrollableEx.defaultProps = {
  verticalScrollRequest: undefined,
  horizontalScrollRequest: undefined,
  focused: false,
  buttonProvider: DefaultButtonProvider,
  className: undefined,
};

export default ReactScrollableEx;
