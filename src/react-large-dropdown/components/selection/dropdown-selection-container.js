import React from "react";
import classnames from "classnames";

function DropdownSelectionContainer({ children }) {
  return <div className={classnames("selection-container")}>{children}</div>;
}

export default DropdownSelectionContainer;
