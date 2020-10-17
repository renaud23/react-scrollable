import React from "react";
import { Td } from "../table-components";
import { getWidth, getCell } from "../commons-table";

function RowContent({
  row,
  index,
  cellRenderer: Cell,
  height,
  header,
  start,
  nb,
}) {
  if (nb) {
    return new Array(nb).fill(null).map(function (_, j) {
      const th = header[start + j];
      const width = getWidth(th);
      const cell = getCell(th, row);
      return (
        <Td key={`${index} - ${start + j}`} width={width}>
          <Cell
            cell={cell}
            row={index}
            column={j}
            height={height}
            width={width}
          />
        </Td>
      );
    });
  }
  return null;
}

export default RowContent;
