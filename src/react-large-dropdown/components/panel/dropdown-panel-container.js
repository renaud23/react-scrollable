import React from "react";
import classnames from "classnames";

function DropdownPanelContainer({ children, focused }) {
  return (
    <div className="panel-container">
      <div className={classnames("panel-content", { focused })}>{children}</div>
    </div>
  );
}

export default DropdownPanelContainer;
