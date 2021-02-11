import React, { useEffect, useRef } from "react";
import classnames from "classnames";

function DropdownContainer({
  children,
  className,
  focused,
  onBlur,
  id,
  labelledBy,
}) {
  const containerEl = useRef();
  const { current } = containerEl;

  useEffect(
    function () {
      function onMouseDown(e) {
        if (!current.contains(e.target)) {
          onBlur();
        }
      }
      window.addEventListener("mousedown", onMouseDown);
      return function () {
        window.removeEventListener("mousedown", onMouseDown);
      };
    },
    [onBlur, current]
  );
  return (
    <div className={classnames("react-large-dropdown-container", className)}>
      <div
        ref={containerEl}
        id={id}
        aria-labelledby={labelledBy}
        className={classnames("react-large-dropdown", { focused })}
      >
        {children}
      </div>
    </div>
  );
}

export default DropdownContainer;
