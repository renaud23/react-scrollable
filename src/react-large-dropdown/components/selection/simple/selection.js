import React from "react";
import "./selection.scss";

function Selection({ onFocus, onBlur }) {
  return (
    <div
      className="dropdown-selection-content"
      tabIndex="0"
      onFocus={onFocus}
      onBlur={onBlur}
    >
      simple
    </div>
  );
}

export default Selection;
