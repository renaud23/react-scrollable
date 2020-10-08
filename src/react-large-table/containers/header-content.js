import React, { useContext } from "react";
import { TableContext } from "../state-management";

import Th from "../components/th";

function HeaderContent() {
  const [state] = useContext(TableContext);
  const { startColumn, nbColumns, header, headerHeight } = state;
  if (nbColumns) {
    return new Array(nbColumns).fill(null).map(function (_, i) {
      const column = header[startColumn + i];
      const { width, label } = column;

      return (
        <Th key={i} width={width} height={headerHeight}>
          {label}
        </Th>
      );
    });
  }
  return null;
}

export default HeaderContent;
