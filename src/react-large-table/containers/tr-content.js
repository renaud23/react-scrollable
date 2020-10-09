import React, { useContext } from "react";
import Td from "../components/td";
import { TableContext } from "../state-management";

function CellRenderer({ column, row, cell }) {
  const type = typeof cell;
  if (type === undefined) {
    return "";
  } else if (type === "string" || type === "number") {
    return cell;
  } else if (type === "object") {
    const { value } = cell;
    return value;
  }
  return `cell[${column}, ${row}]`;
}

function Content({ row, index }) {
  const [state] = useContext(TableContext);
  const { header, startColumn, nbColumns } = state;
  if (startColumn === undefined) {
    return null;
  }
  return new Array(nbColumns).fill(null).map(function (_, i) {
    const column = header[startColumn + i];
    const { width, path } = column;
    const cell = path in row ? row[path] : undefined;
    return (
      <Td key={i} width={width}>
        <CellRenderer column={startColumn + i} row={index} cell={cell} />
      </Td>
    );
  });
}

export default Content;
