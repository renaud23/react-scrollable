import React, { useCallback } from "react";
import classnames from "classnames";
import "./scrollbar.scss";

function safeCss(value) {
  return value || 0;
}

function getStyle(vertical, tPos, tSize) {
  if (vertical) {
    return { marginTop: safeCss(tPos), height: safeCss(tSize) };
  }
  return { marginLeft: safeCss(tPos), width: safeCss(tSize) };
}

/**
 *
 * @param {*} param0
 */
export default React.forwardRef(function Scrollbar(
  {
    className,
    vertical = false,
    pSize,
    tPos,
    tSize,
    max,
    drag,
    onTrackMouseDown = () => null,
    onBarMouseDown = () => null,
  },
  containerEl
) {
  const onMouseDownTrackCallback = useCallback(
    function (e) {
      e.stopPropagation();
      if (e.button === 0) {
        const clientPos = vertical ? e.clientY : e.clientX;
        onTrackMouseDown(clientPos);
      }
    },
    [onTrackMouseDown, vertical]
  );

  const onMouseDownBarCallback = useCallback(
    function (e) {
      e.stopPropagation();
      if (e.button === 0) {
        const { left, top } = e.target.getBoundingClientRect();
        const clientPos = vertical ? e.clientY - top : e.clientX - left;
        onBarMouseDown(clientPos);
      }
    },
    [onBarMouseDown, vertical]
  );

  const hidden = pSize >= max;
  return (
    <div
      ref={containerEl}
      className={classnames("react-scrollbar", className, {
        hidden,
        "on-drag": drag,
      })}
      onMouseDown={onMouseDownBarCallback}
    >
      {hidden ? null : (
        <div
          className={classnames("react-scrollbar-track", className, {
            "on-drag": drag,
          })}
          style={getStyle(vertical, tPos, tSize)}
          onMouseDown={onMouseDownTrackCallback}
        />
      )}
    </div>
  );
});
