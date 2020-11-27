import React from "react";
import classnames from "classnames";

function ScrollbarButton({ className, disabled = false }) {
  return (
    <div
      className={classnames("react-scrollbar-ex-button", className, {
        disabled,
      })}
    >
      <i className={classnames("arrow", className, { disabled })}></i>
    </div>
  );
}

export default ScrollbarButton;
