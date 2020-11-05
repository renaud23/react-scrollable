import React from "react";
import SelectionListener from "./selection-listener";

function Renderer({ column, index }) {
  const { label } = column;
  return (
    <SelectionListener
      className="th-el-container"
      type="head"
      column={index}
      row={0}
    >
      {label}
    </SelectionListener>
  );
}

export default Renderer;
