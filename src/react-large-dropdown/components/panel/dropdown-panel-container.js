import React from "react";
import classnames from "classnames";

function DropdownPanelContainer({ children, expended }) {
  return (
    <div className={classnames("panel-container")}>
      <div className={classnames("panel-content", { expended })}>
        {children}
      </div>
    </div>
  );
}

export default DropdownPanelContainer;
