import React from "react";

function Table({ id, children }) {
  return (
    <table className="react-large-table" id={id}>
      {children}
    </table>
  );
}

export default Table;
