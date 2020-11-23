import React, { useState, useEffect, useCallback } from "react";
import { ScrollableContext, actions } from "./state-management";
import { useDispatch } from "../../commons-scrollable";

function getClientPos(e) {
  const { changedTouches } = e;
  if (changedTouches && changedTouches.length === 1) {
    const { clientX, clientY } = changedTouches[0];
    return [clientX, clientY];
  }
  return [undefined, undefined];
}

function emptyCallback() {}

function ResponsiveDiv({
  children,
  containerEl,
  className,
  onWheel,
  onKeyDown,
  onFocus,
  onBlur,
}) {
  const dispatch = useDispatch(ScrollableContext);
  const [previousPos, setPreviousPos] = useState(undefined);
  const [clientPos, setClientPos] = useState(undefined);
  const [delta, setDelta] = useState(undefined);

  const onTouchStart = useCallback(function (e) {
    e.preventDefault();
    const pos = getClientPos(e);
    setPreviousPos(undefined);
    setClientPos(pos);
  }, []);

  const onTouchMove = useCallback(
    function (e) {
      e.preventDefault();
      const pos = getClientPos(e);
      setPreviousPos(clientPos);
      setClientPos(pos);
    },
    [clientPos]
  );

  const onTouchEnd = useCallback(function (e) {
    e.preventDefault();
  }, []);

  useEffect(
    function () {
      if (previousPos) {
        setDelta([
          previousPos[0] - clientPos[0],
          previousPos[1] - clientPos[1],
        ]);
      } else {
        setDelta([0, 0]);
      }
    },
    [clientPos, previousPos]
  );

  useEffect(
    function () {
      if (delta) {
        const [dx, dy] = delta;
        if (Math.abs(dx) > Math.abs(dy)) {
          dispatch(actions.onHorizontalTouch(dx));
        } else {
          dispatch(actions.onVerticalTouch(dy));
        }
      }
    },
    [delta, dispatch]
  );

  useEffect(
    function () {
      const { current } = containerEl;
      if (current) {
        current.addEventListener("touchstart", onTouchStart, false);
        current.addEventListener("touchend", onTouchEnd, false);
        current.addEventListener("touchmove", onTouchMove, false);
      }

      return () => {
        current.removeEventListener("touchstart", onTouchStart);
        current.removeEventListener("touchend", onTouchEnd);
        current.removeEventListener("touchmove", onTouchMove);
      };
    },
    [containerEl, onTouchMove, onTouchEnd, onTouchStart]
  );

  return (
    <div
      ref={containerEl}
      className={className}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
      tabIndex="0"
      onFocus={onFocus}
      onBlur={onBlur}
    >
      {children}
    </div>
  );
}

ResponsiveDiv.defaultProps = {
  onWheel: emptyCallback,
  onKeyDown: emptyCallback,
  onFocus: emptyCallback,
  onBlur: emptyCallback,
};

export default React.forwardRef(function ScrollbarVertical(props, ref) {
  return <ResponsiveDiv {...props} containerEl={ref} />;
});
