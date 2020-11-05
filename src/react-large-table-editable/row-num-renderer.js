import React from "react";
import SelectionListener from "./selection-listener";

function RowRenderer({ index }) {
  return (
    <SelectionListener className="row" type="row" row={index} column={0}>
      {index + 1}
    </SelectionListener>
  );
}

export default React.memo(RowRenderer);
