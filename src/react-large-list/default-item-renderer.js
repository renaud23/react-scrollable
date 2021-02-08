import React from "react";
import { getValue } from "./commons-list";

function DefaultItemRenderer({ item, height }) {
  const value = getValue(item);
  return (
    <span
      className="default-item-renderer"
      style={{ lineHeight: `${height}px` }}
    >
      {value}
    </span>
  );
}

export default DefaultItemRenderer;
