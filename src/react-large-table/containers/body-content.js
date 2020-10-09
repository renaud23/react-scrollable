import React, { useContext } from "react";
import Tr from "../components/tr";
import Td from "../components/td";
import { TableContext } from "../state-management";

function Content({ row }) {
  const [state] = useContext(TableContext);
  const { header, startColumn, nbColumns } = state;
  return new Array(nbColumns).fill(null).map(function (_, i) {
    const column = header[startColumn + i];
    const { width } = column;
    return (
      <Td key={i} width={width}>
        row
      </Td>
    );
  });
}

function BodyContent() {
  const [state] = useContext(TableContext);
  const { nbRows, rows, startRow } = state;
  if (nbRows) {
    return new Array(nbRows).fill(null).map(function (_, i) {
      const row = rows[startRow + i];
      const { __height } = row;
      return (
        <Tr key={i} height={__height}>
          <Content row={row} index={startRow + i} />
        </Tr>
      );
    });
  }
  return null;
}

export default BodyContent;
