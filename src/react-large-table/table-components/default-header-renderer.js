import React from "react";

function getDefault(index) {
  return `Column ${index + 1}`;
}

function getObject(column, index) {
  const { label } = column;
  if (typeof label === "string") {
    return label;
  }
  return getDefault(index);
}

function getValue(column, index) {
  const type = typeof column;
  switch (type) {
    case "object":
      return getObject(column, index);
    case "string":
    case "number":
      return column;
    default:
      return getDefault(index);
  }
}

function Renderer({ column, index }) {
  return <div className="th-el-container">{getValue(column, index)}</div>;
}

export default Renderer;
