import React, { useEffect, useCallback, useContext, useRef } from "react";
import classnames from "classnames";
import { getDeltaAmplitude } from "../../commons-scrollable";
import { ScrollableContext, actions } from "../state-management";

function ScrollableContainer({
  children,
  className,
  onFocus,
  onBlur,
  onKeyDown,
}) {
  const containerEl = useRef();
  const [state, dispatch] = useContext(ScrollableContext);
  const { vertical, focused } = state;
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
    <div
      tabIndex="0"
      ref={containerEl}
      className={classnames("react-scrollable-ex", className, { focused })}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
}

export default ScrollableContainer;
