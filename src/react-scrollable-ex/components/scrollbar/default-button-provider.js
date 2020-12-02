import React from "react";
import classnames from "classnames";

function DefaultButtonProvider({ type, disabled }) {
  return <i className={classnames("arrow", type, { disabled })}></i>;
}

export default DefaultButtonProvider;
