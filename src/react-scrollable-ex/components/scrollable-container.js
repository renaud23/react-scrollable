import React, { useEffect, useCallback, useRef, useContext } from "react";
import { getDeltaAmplitude } from "../../commons-scrollable";
import { ScrollableContext, actions } from "../state-management";

function ScrollableContainer({ children }) {
  const containerEl = useRef();
  const [state, dispatch] = useContext(ScrollableContext);
  const { vertical } = state;
  const onWheel = useCallback(
    function (e) {
      e.preventDefault();
      dispatch(actions.onVerticalScroll(getDeltaAmplitude(vertical, e.deltaY)));
    },
    [dispatch, vertical]
  );

  useEffect(
    function () {
      const { current } = containerEl;
      if (current) {
        current.addEventListener("wheel", onWheel, false);
      }
      return () => {
        current.removeEventListener("wheel", onWheel);
      };
    },
    [containerEl, onWheel]
  );
  return (
    <div ref={containerEl} className="react-scrollable-ex">
      {children}
    </div>
  );
}

export default ScrollableContainer;
