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

function ReactScrollable({
  children,
  maxWidth,
  maxHeight,
  refWidth,
  refHeight,
  onHorizontalScroll,
  onVerticalScroll,
  verticalScrollRequest,
  horizontalScrollRequest,
  focused,
  className,
  idContent,
  tabIndex,
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
      dispatch(
        actions.onUpdateProps({
          maxWidth,
          maxHeight,
          focused,
          idContent,
          refWidth,
          refHeight,
        })
      );
    },
    [maxWidth, maxHeight, refWidth, refHeight, focused, idContent]
  );

  useEffect(
    function () {
      if (verticalScrollRequest) {
        dispatch(actions.onVerticalScrollTo(verticalScrollRequest));
      }
    },
    [verticalScrollRequest, dispatch]
  );

  useEffect(
    function () {
      if (horizontalScrollRequest) {
        dispatch(actions.onHorizontalScrollTo(horizontalScrollRequest));
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
        tabIndex={tabIndex}
      >
        {children}
        <HorizontalScrollbar buttonProvider={buttonProvider} />
        <VerticalScrollbar buttonProvider={buttonProvider} />
        <Corner />
      </ScrollableContainer>
    </ScrollableContext.Provider>
  );
}

ReactScrollable.propTypes = {
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  refWidth: PropTypes.number,
  refHeight: PropTypes.number,
  idContent: PropTypes.string,
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
  tabIndex: PropTypes.oneOf(["0", "-1"]),
};

ReactScrollable.defaultProps = {
  verticalScrollRequest: undefined,
  horizontalScrollRequest: undefined,
  focused: false,
  buttonProvider: DefaultButtonProvider,
  className: undefined,
  idContent: undefined,
  tabIndex: "0",
};

export default ReactScrollable;
