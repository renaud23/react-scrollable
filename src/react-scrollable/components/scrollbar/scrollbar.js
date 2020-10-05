import React, { useCallback } from "react";
import classnames from "classnames";
import "./scrollbar.scss";

function getStyle(vertical, tPos, tSize) {
  if (vertical) {
    return { marginTop: tPos, height: tSize };
  }
  return { marginLeft: tPos, width: tSize };
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
    onMouseDown = () => null,
  },
  containerEl
) {
  const onMouseDownCallback = useCallback(
    function (e) {
      e.stopPropagation();
      if (e.button === 0) {
        const clientPos = vertical ? e.clientY : e.clientX;
        onMouseDown(clientPos);
      }
    },
    [onMouseDown, vertical]
  );
  const hidden = pSize >= max;
  return (
    <div
      ref={containerEl}
      className={classnames("react-scrollbar", className, { hidden })}
    >
      {hidden ? null : (
        <div
          className={classnames("react-scrollbar-track", className)}
          style={getStyle(vertical, tPos, tSize)}
          onMouseDown={onMouseDownCallback}
        />
      )}
    </div>
  );
});
