import React, { useState, useContext, useCallback } from "react";
import classnames from "classnames";
import { EditableContext } from "./state-management";
import SelectionListener from "./selection-listener";
import { matchRule } from "./state-management";
import InputField from "./input-field";

function EditableCell({
  cell,
  row,
  column,
  width,
  height,
  getValue,
  setValue,
  cellRenderer: Cell,
}) {
  const [state] = useContext(EditableContext);
  const { selection } = state;
  const [edit, setEdit] = useState(false);
  const onClick = useCallback(function () {
    setEdit(true);
  }, []);

  if (!edit) {
    return (
      <SelectionListener
        className={classnames("editable-cell", "excel-theme-cell", {
          selected: matchRule(selection, row, column),
        })}
        type="cell"
        row={row}
        column={column}
        onClick={onClick}
      >
        <Cell
          cell={cell}
          row={row}
          column={column}
          width={width}
          height={height}
        />
      </SelectionListener>
    );
  }
  return (
    <span
      className={classnames("editable-cell", "excel-theme-cell")}
      type="cell"
      row={row}
      column={column}
    >
      <InputField
        cell={cell}
        getValue={getValue}
        setValue={setValue}
        row={row}
        column={column}
        height={height}
        onBlur={() => setEdit(false)}
      />
    </span>
  );
}

export default EditableCell;
