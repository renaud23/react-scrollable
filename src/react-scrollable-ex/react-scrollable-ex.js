import React, { useReducer, useEffect } from "react";
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
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(
    function () {
      dispatch(actions.onUpdateProps({ maxWidth, maxHeight }));
    },
    [maxWidth, maxHeight]
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

export default ReactScrollableEx;
