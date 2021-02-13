import React, { useCallback } from "react";
import "./selection.scss";

function getLabel(selection, placeholder) {
  if (selection && selection.label) {
    const { label } = selection;
    return label;
  }
  return placeholder;
}

function Selection({ onClick, onFocus, onKeyDown, selection, placeHolder }) {
  const onKeyDownCallback = useCallback(
    function (e) {
      const { key } = e;
      if (key !== "Tab") {
        e.preventDefault();
      }
      onKeyDown(key);
    },
    [onKeyDown]
  );
  function onClickCallback(e) {
    onClick();
  }

  const label = getLabel(selection, placeHolder);

  return (
    <button
      className="dropdown-selection-content"
      tabIndex="0"
      aria-haspopup="listbox"
      onClick={onClickCallback}
      onFocus={onFocus}
      onKeyDown={onKeyDownCallback}
      title={label}
    >
      {label}
    </button>
  );
}

export default Selection;
