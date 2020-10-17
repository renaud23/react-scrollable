import React, { useContext } from "react";
import { TableContext } from "../state-management";

function Table({ children }) {
  const [{ id }] = useContext(TableContext);
  return (
    <table className="react-large-table-table-el" id={id}>
      {children}
    </table>
  );
}

export default Table;
