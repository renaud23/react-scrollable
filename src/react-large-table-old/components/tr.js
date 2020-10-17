import React from "react";
import classnames from "classnames";

function Tr({ children, odd }) {
  return (
    <tr className={classnames("react-large-table-tr-el", { odd })}>
      {children}
    </tr>
  );
}

export default Tr;
