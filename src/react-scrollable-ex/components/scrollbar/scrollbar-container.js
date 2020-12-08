import React from "react";
import classnames from "classnames";

function getAria(scrollbar) {
  const { percent } = scrollbar;
  const now = Math.trunc(percent * 10000) / 100;
  return { min: 0, max: 100, now };
}

const ScrollbarContainer = React.forwardRef(function (
  { children, idContent, horizontal, scrollbar },
  containerEl
) {
  const { min, max, now } = getAria(scrollbar);
  return (
    <div
      ref={containerEl}
      role="scrollbar"
      aria-controls={idContent}
      aria-orientation={horizontal ? "horizontal" : "vertical"}
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={now}
      className={classnames("react-scrollbar-ex", {
        horizontal,
        vertical: !horizontal,
      })}
    >
      {children}
    </div>
  );
});

export default ScrollbarContainer;
