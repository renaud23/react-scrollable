import React from "react";
import { Td } from "../table-components";
import { getWidth, getCell } from "../commons-table";

function getRowSpan(cell) {
  if (typeof cell === "object") {
    return cell.rowSpan;
  }
  return undefined;
}

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
    return new Array(nb).fill(null).reduce(function (stack, _, j) {
      const column = start + j;
      const th = header[column];
      const width = getWidth(th);
      const cell = getCell(th, row);
      if (cell) {
        const rowSpan = getRowSpan(cell);
        return [
          ...stack,
          <Td
            key={`${index} - ${column}`}
            width={width}
            row={index}
            first={j === 0}
            rowSpan={rowSpan}
          >
            <Cell
              cell={cell}
              row={index}
              column={column}
              height={height}
              width={width}
            />
          </Td>,
        ];
      }
      return stack;
    }, []);
  }
  return null;
}

export default RowContent;
