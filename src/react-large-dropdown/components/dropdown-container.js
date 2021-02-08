import React from "react";
import classnames from "classnames";

function DropdownContainer({ children, className, focused }) {
  return (
    <div className={classnames("react-large-dropdown-container", className)}>
      <div className={classnames("react-large-dropdown", { focused })}>
        {children}
      </div>
    </div>
  );
}

export default DropdownContainer;
