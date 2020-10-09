import React, { useContext } from "react";
import { TableContext } from "../state-management";
import { safeCss } from "../commons";

function TBody({ children }) {
  const [state] = useContext(TableContext);
  const { marginTop, headerHeight, marginLeft } = state;
  return (
    <tbody
      className="react-large-table-tbody-el"
      style={{
        marginTop: safeCss(marginTop + headerHeight),
        marginLeft: safeCss(marginLeft),
      }}
    >
      {children}
    </tbody>
  );
}

export default TBody;
