import React from "react";
import { Td } from "../table-components";

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
      const { width, path } = th;
      const cell = path in row ? row[path] : {};
      return (
        <Td key={`${index} - ${j}`} width={width}>
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
