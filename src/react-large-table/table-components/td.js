import React from "react";
import { safeCss } from "../../commons-scrollable";

function Td({ children, width }) {
  return (
    <td style={{ width: safeCss(width) }} className="react-large-table-td">
      {children}
    </td>
  );
}

export default Td;
