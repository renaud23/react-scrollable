import React, { useState, useEffect } from "react";
import classnames from "classnames";
import "./switch.scss";

function emptyCallback() {}

function Switch({
  value = false,
  label = "Your label",
  onChange = emptyCallback,
}) {
  const [on, setOn] = useState(value);
  useEffect(
    function () {
      onChange(on);
    },
    [onChange, on]
  );
  return (
    <div className="switch">
      <div className="label">{label}</div>
      <div
        onClick={() => setOn(!on)}
        className={classnames("button-bascule", { on })}
      ></div>
    </div>
  );
}

export default Switch;
