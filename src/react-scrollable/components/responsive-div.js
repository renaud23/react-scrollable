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

const DELTA_Y = [];

function applyDeltaY(callback) {
  if (DELTA_Y.length) {
    callback(DELTA_Y.shift());
  }
}

function ResponsiveDiv({
  children,
  containerEl,
  className,
  onWheel,
  onKeyDown,
}) {
  const dispatch = useDispatch(ScrollableContext);
  const [clientX, setClientX] = useState(undefined);
  const [clientY, setClientY] = useState(undefined);
  const [dx, setDx] = useState(undefined);
  const [dy, setDy] = useState(undefined);

  const onTouchStart = useCallback(function (e) {
    e.preventDefault();
    const [x, y] = getClientPos(e);
    setClientX(x);
    setClientY(y);
    setDx(0);
    setDy(0);
  }, []);

  const apply = useCallback(
    function (delta) {
      dispatch(actions.onVerticalTouch(delta));
    },
    [dispatch]
  );

  const schedule = useCallback(
    function () {
      applyDeltaY(apply);
    },
    [apply]
  );

  useEffect(
    function () {
      const interval = window.setInterval(schedule, 10);
      return () => window.clearInterval(interval);
    },
    [schedule]
  );

  const onTouchMove = useCallback(
    function (e) {
      e.preventDefault();
      const [x, y] = getClientPos(e);
      setClientX(x);
      setClientY(y);
      setDx(clientX - x);
      setDy(clientY - y + dy);
    },
    [clientX, clientY, dy]
  );

  const onTouchEnd = useCallback(function (e) {
    e.preventDefault();
    setClientX(undefined);
    setClientY(undefined);
  }, []);

  useEffect(
    function () {
      if (dx !== undefined && dy !== undefined) {
        if (Math.abs(dy) > Math.abs(dx)) {
          if (Math.abs(dy) > 30) {
            DELTA_Y.push(dy);
          } else {
            dispatch(actions.onVerticalTouch(dy));
            setDx(0);
            setDy(0);
          }
        } else {
          dispatch(actions.onHorizontalTouch(dx));
          setDy(0);
          setDx(0);
        }
      }
    },
    [dx, dy, dispatch]
  );

  useEffect(
    function () {
      const { current } = containerEl;
      if (current) {
        current.addEventListener("touchstart", onTouchStart, false);
        current.addEventListener("touchend", onTouchEnd, false);
        current.addEventListener("touchmove", onTouchMove, false);
        // current.addEventListener("touchcancel", onTouchCanceled);
      }

      return () => {
        current.removeEventListener("touchstart", onTouchStart);
        current.removeEventListener("touchend", onTouchEnd);
        current.removeEventListener("touchmove", onTouchMove);
        // current.removeEventListener("touchcancel", onTouchCanceled);
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
    >
      {children}
    </div>
  );
}

ResponsiveDiv.defaultProps = {
  onWheel: emptyCallback,
  onKeyDown: emptyCallback,
};

export default React.forwardRef(function ScrollbarVertical(props, ref) {
  return <ResponsiveDiv {...props} containerEl={ref} />;
});
