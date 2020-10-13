import React from "react";
import { safeCss } from "../commons";

function Td({ children, width, height }) {
  return (
    <td
      className="react-large-table-td-el"
      style={{ width: safeCss(width), height: safeCss(height) }}
    >
      {children}
    </td>
  );
}

export default Td;
