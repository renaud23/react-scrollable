import React, { useCallback } from "react";
import classnames from "classnames";
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
    <div className={classnames("dropdown-selection-content", "writable")}>
      <input type="text" onFocus={onFocus} onKeyDown={onKeyDownCallback} />
    </div>
  );
}

export default Selection;
