import React, { useContext } from "react";
import Tr from "../components/tr";
import TrContent from "./tr-content";
import { TableContext } from "../state-management";

function BodyContent({ cellRenderer }) {
  const [state] = useContext(TableContext);
  const { vertical, rows } = state;
  const { nb, start } = vertical;
  if (nb) {
    return new Array(nb).fill(null).map(function (_, i) {
      const index = start + i;
      const row = rows[index];
      const { __height } = row;
      return (
        <Tr key={index} height={__height} odd={i % 2 === 1}>
          <TrContent
            row={row}
            index={index}
            height={__height}
            cellRenderer={cellRenderer}
          />
        </Tr>
      );
    });
  }
  return null;
}

export default BodyContent;
