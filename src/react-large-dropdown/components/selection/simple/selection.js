import React, { useCallback } from "react";
import "./selection.scss";

function Selection({ onFocus, onBlur, onKeyDown }) {
  const onKeyDownCallback = useCallback(
    function (e) {
      const { key } = e;
      if (key === "Tab") {
        onBlur();
      } else {
        e.preventDefault();
        onKeyDown(key);
      }
    },
    [onBlur, onKeyDown]
  );

  return (
    <div
      className="dropdown-selection-content"
      tabIndex="0"
      onFocus={onFocus}
      onKeyDown={onKeyDownCallback}
    >
      simple
    </div>
  );
}

export default Selection;
