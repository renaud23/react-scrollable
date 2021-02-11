import React, { useCallback } from "react";
import classnames from "classnames";
import "./selection.scss";

function Selection({ onClick, onFocus, onBlur, onKeyDown }) {
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
  function onClickCallback(e) {
    onClick();
  }
  return (
    <div className={classnames("dropdown-selection-content", "writable")}>
      <input
        aria-haspopup="listbox"
        type="text"
        onClick={onClickCallback}
        onFocus={onFocus}
        onKeyDown={onKeyDownCallback}
      />
    </div>
  );
}

export default Selection;
