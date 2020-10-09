import React, { useContext } from "react";
import Tr from "../components/tr";
import TrContent from "./tr-content";
import { TableContext } from "../state-management";

function BodyContent() {
  const [state] = useContext(TableContext);
  const { nbRows, rows, startRow } = state;
  if (nbRows) {
    return new Array(nbRows).fill(null).map(function (_, i) {
      const row = rows[startRow + i];
      const { __height } = row;
      return (
        <Tr key={i} height={__height}>
          <TrContent row={row} index={startRow + i} height={__height} />
        </Tr>
      );
    });
  }
  return null;
}

export default BodyContent;
