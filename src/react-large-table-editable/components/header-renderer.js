import React, { useContext } from "react";
import classnames from "classnames";
import SelectionListener from "./selection-listener";
import { EditableContext } from "../state-management";
import { getLabel } from "../../react-large-table/commons-table";

function isInSelection(selection, index) {
  if (selection) {
    const { rule } = selection;
    const { type, column = [] } = rule;
    if (column && type === "head") {
      const [start, end] = column;
      if (index >= start && index <= end) {
        return true;
      }
    }
  }
  return false;
}

function Renderer({ column, index }) {
  const [state] = useContext(EditableContext);
  const label = getLabel(column);
  const { selection } = state;
  const selected = isInSelection(selection, index);

  return (
    <SelectionListener
      className={classnames("th-el-container", { selected })}
      type="head"
      column={index}
      row={0}
    >
      {label}
    </SelectionListener>
  );
}

export default Renderer;
