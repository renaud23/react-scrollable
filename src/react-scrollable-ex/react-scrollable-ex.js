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

import "./react-scrollable-ex.scss";

function ReactScrollableEx({
  children,
  maxWidth,
  maxHeight,
  onHorizontalScroll,
  onVerticalScroll,
  verticalScrollRequest,
  horizontalScrollRequest,
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
      dispatch(actions.onUpdateProps({ maxWidth, maxHeight }));
    },
    [maxWidth, maxHeight]
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
      <ScrollableContainer>
        <HorizontalScrollbar />
        <VerticalScrollbar />
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
};

ReactScrollableEx.defaultProps = {
  verticalScrollRequest: undefined,
  horizontalScrollRequest: undefined,
};

export default ReactScrollableEx;
