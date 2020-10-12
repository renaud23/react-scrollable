import React from "react";
import classnames from "classnames";
import { safeCss } from "../commons";

function Tr({ children, height, odd }) {
  return (
    <tr
      className={classnames("react-large-table-tr-el", { odd })}
      style={{ height: safeCss(height) }}
    >
      {children}
    </tr>
  );
}

export default Tr;
