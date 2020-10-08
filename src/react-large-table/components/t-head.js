import React, { useContext } from "react";
import { TableContext } from "../state-management";
import { safeCss } from "../commons";

function THead({ children }) {
  const [state] = useContext(TableContext);
  const { marginLeft, headerHeight } = state;

  return (
    <thead
      className="react-large-table-thead-el"
      style={{ height: safeCss(headerHeight), marginLeft: safeCss(marginLeft) }}
    >
      {children}
    </thead>
  );
}

export default THead;
