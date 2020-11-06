import React, { useContext } from "react";
import classnames from "classnames";
import SelectionListener from "./selection-listener";
import { EditableContext } from "./state-management";

function isInSelection(selection, index) {
  if (selection) {
    const { rule } = selection;
    const { type, row } = rule;

    if (row && type === "row") {
      const [start, end] = row;
      if (index >= start && index <= end) {
        return true;
      }
    }
  }
  return false;
}

function RowRenderer({ index }) {
  const [state] = useContext(EditableContext);
  const { selection } = state;
  const selected = isInSelection(selection, index);

  return (
    <SelectionListener
      className={classnames("row", { selected })}
      type="row"
      row={index}
      column={0}
    >
      {index + 1}
    </SelectionListener>
  );
}

export default React.memo(RowRenderer);
