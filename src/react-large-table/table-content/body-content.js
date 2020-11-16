import React from "react";
import RowContent from "./row-content";
import { Tr } from "../table-components";
import { getHeight } from "../commons-table";

function isEven(i) {
  return i % 2 === 0 ? true : false;
}

function BodyContent({
  rows,
  header,
  rowHeight,
  startRow,
  nbRows,
  cellRenderer,
  startColumns,
  nbColumns,
}) {
  if (nbRows) {
    return new Array(nbRows).fill(null).map(function (_, i) {
      const index = startRow + i;
      const row = rows[index];
      const height = rowHeight || getHeight(row);
      const even = isEven(index);
      return (
        <Tr key={index} height={height} odd={!even} even={even}>
          <RowContent
            cellRenderer={cellRenderer}
            header={header}
            row={row}
            index={index}
            start={startColumns}
            nb={nbColumns}
            height={height}
          />
        </Tr>
      );
    });
  }
  return null;
}

export default BodyContent;
