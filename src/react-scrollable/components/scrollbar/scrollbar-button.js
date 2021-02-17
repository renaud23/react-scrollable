import React, { useCallback, useContext, useEffect, useState } from "react";
import classnames from "classnames";
import { actions, ScrollableContext } from "../../state-management";
import { getDeltaAmplitude } from "../../../commons-scrollable";

export const BUTTON_TYPES = {
  top: "top",
  bottom: "bottom",
  right: "right",
  left: "left",
};

const DELTA_BASE = 100;

function ScrollbarButton({ type, disabled = false, buttonProvider: Button }) {
  const [state, dispatch] = useContext(ScrollableContext);
  const { horizontal, vertical } = state;
  const { ref: width } = vertical;
  const { ref: height } = horizontal;
  const [move, setMove] = useState(false);

  const [scrollTask, setScrollTask] = useState(undefined);
  const [waitTask, setWaitTask] = useState(undefined);

  const triggerMove = useCallback(
    function (first) {
      switch (type) {
        case BUTTON_TYPES.top:
          dispatch(
            actions.onVerticalScroll(getDeltaAmplitude(vertical, -DELTA_BASE))
          );
          break;
        case BUTTON_TYPES.bottom:
          dispatch(
            actions.onVerticalScroll(getDeltaAmplitude(vertical, DELTA_BASE))
          );
          break;
        case BUTTON_TYPES.left:
          dispatch(
            actions.onHorizontalScroll(
              getDeltaAmplitude(horizontal, -DELTA_BASE)
            )
          );
          break;
        case BUTTON_TYPES.right:
          dispatch(
            actions.onHorizontalScroll(
              getDeltaAmplitude(horizontal, DELTA_BASE)
            )
          );
          break;
        default:
      }
    },
    [type, horizontal, vertical, dispatch]
  );

  const onMousDownCallback = useCallback(
    function (e) {
      if (e.button === 0) {
        if (!disabled) {
          setMove(true);
          triggerMove();
          if (waitTask) window.clearTimeout(waitTask);
          if (scrollTask) {
            window.clearInterval(scrollTask);
          }
          setWaitTask(
            window.setTimeout(function () {
              setScrollTask(window.setInterval(triggerMove, 30));
            }, 600)
          );
        }
      }
    },
    [disabled, triggerMove, waitTask, scrollTask]
  );
  const onMouseUpCallback = useCallback(
    function () {
      if (move) {
        window.clearInterval(scrollTask);
        window.clearTimeout(waitTask);
        setScrollTask(undefined);
        setWaitTask(waitTask);
        setMove(false);
      }
    },
    [move, waitTask, scrollTask]
  );

  useEffect(
    function () {
      document.addEventListener("mouseup", onMouseUpCallback);
      return () => {
        document.removeEventListener("mouseup", onMouseUpCallback);
      };
    },
    [onMouseUpCallback]
  );

  return (
    <div
      className={classnames("react-scrollbar-ex-button-container", type, {
        disabled,
      })}
      aria-hidden="true"
      onMouseDown={onMousDownCallback}
    >
      <Button width={width} height={height} type={type} disabled={disabled} />
    </div>
  );
}

export default ScrollbarButton;
