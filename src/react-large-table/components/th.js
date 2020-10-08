import React from "react";
import { safeCss } from "../commons"; //useOuterCssSize

function Th({ children, width, height }) {
  // const [ref, delta] = useOuterCssSize();
  // const { width: dw, height: dh } = delta;//ref={ref}
  return (
    <th
      className="react-large-table-th-el"
      style={{ width: safeCss(width), height: safeCss(height) }}
    >
      {children}
    </th>
  );
}

export default Th;
