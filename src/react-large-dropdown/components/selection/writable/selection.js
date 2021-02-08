import React from "react";
import classnames from "classnames";
import "./selection.scss";

function Selection({ onFocus, onBlur }) {
  return (
    <div className={classnames("dropdown-selection-content", "writable")}>
      <input type="text" onFocus={onFocus} onBlur={onBlur} />
    </div>
  );
}

export default Selection;
