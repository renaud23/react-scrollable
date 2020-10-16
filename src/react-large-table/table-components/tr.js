import React from "react";
import classnames from "classnames";
import { safeCss } from "../../commons-scrollable";

function Tr({ children, height, odd, even }) {
  return (
    <tr
      style={{ height: safeCss(height) }}
      className={classnames("react-large-table-tr", { odd, even })}
    >
      {children}
    </tr>
  );
}

export default React.memo(Tr);
