import React from "react";
import classnames from "classnames";

function Table({ id, children, className }) {
  return (
    <table className={classnames("react-large-table", className)} id={id}>
      {children}
    </table>
  );
}

export default React.memo(Table);
