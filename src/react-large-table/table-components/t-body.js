import React from "react";
import { safeCss } from "../../commons-scrollable";

function Tbody({ children, marginLeft, marginTop }) {
  return (
    <tbody
      className="react-large-table-tbody"
      style={{
        marginLeft: safeCss(marginLeft),
        marginTop: safeCss(marginTop),
      }}
    >
      {children}
    </tbody>
  );
}

export default Tbody;
