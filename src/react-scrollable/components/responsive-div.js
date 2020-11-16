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
}) {
  const dispatch = useDispatch(ScrollableContext);
  const [posX, setPosX] = useState(undefined);
  const [posY, setPosY] = useState(undefined);
  const [dx, setDx] = useState(undefined);
  const [dy, setDy] = useState(undefined);

  const onTouchMove = useCallback(
    function (e) {
      e.preventDefault();
      const [x, y] = getClientPos(e);
      if (posX !== undefined && posY !== undefined) {
        setDx(posX - x);
        setDy(posY - y);
      }
      setPosY(y);
      setPosX(x);
    },
    [posX, posY]
  );

  const onTouchStart = useCallback(function (e) {
    e.preventDefault();
    const [x, y] = getClientPos(e);
    setPosX(x);
    setPosY(y);
  }, []);

  const onTouchEnd = useCallback(function (e) {
    e.preventDefault();
    setPosX(undefined);
    setPosY(undefined);
  }, []);

  useEffect(
    function () {
      if (dx !== undefined && dy !== undefined) {
        if (Math.abs(dx) > Math.abs(dy)) {
          dispatch(actions.onHorizontalTouch(dx));
        } else {
          dispatch(actions.onVerticalTouch(dy));
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
      }
      return () => {
        current.removeEventListener("touchstart", onTouchStart);
        current.removeEventListener("touchend", onTouchEnd);
        current.removeEventListener("touchmove", onTouchMove);
      };
    },
    [containerEl, onTouchStart, onTouchMove, onTouchEnd]
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
