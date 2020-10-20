import React from "react";
import { Th } from "../table-components";
import { getWidth } from "../commons-table";

function HeaderContent({ header, start, nb }) {
  if (nb) {
    return new Array(nb).fill(null).map(function (_, i) {
      const index = start + i;
      const column = header[index];
      const { label } = column;
      return (
        <Th key={index} index={index} width={getWidth(column)}>
          {label}
        </Th>
      );
    });
  }

  return null;
}

export default HeaderContent;
