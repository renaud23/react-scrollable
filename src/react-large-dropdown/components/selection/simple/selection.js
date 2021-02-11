import React, { useCallback } from "react";
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
    <button
      className="dropdown-selection-content"
      tabIndex="0"
      aria-haspopup="listbox"
      onClick={onClickCallback}
      onFocus={onFocus}
      onKeyDown={onKeyDownCallback}
    >
      simple
    </button>
  );
}

export default Selection;
