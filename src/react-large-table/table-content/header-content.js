import React from "react";
import { Th } from "../table-components";
import { getWidth } from "../commons-table";

function HeaderContent({ header, start, nb, headerRenderer: Renderer }) {
  if (nb) {
    return new Array(nb).fill(null).map(function (_, i) {
      const index = start + i;
      const column = header[index];
      const width = getWidth(column);
      return (
        <Th key={index} index={index} width={getWidth(column)}>
          <Renderer column={column} width={width} index={index} />
        </Th>
      );
    });
  }

  return null;
}

export default HeaderContent;
