import React, { useState } from "react";
import classnames from "classnames";
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
  const [edit, setEdit] = useState(false);

  if (!edit) {
    return (
      <span
        className={classnames("editable-cell", "excel-theme-cell")}
        onClick={(e) => {
          if (e.button === 0) {
            setEdit(true);
          }
        }}
      >
        <Cell
          cell={cell}
          row={row}
          column={column}
          width={width}
          height={height}
        />
      </span>
    );
  }
  return (
    <span className={classnames("editable-cell", "excel-theme-cell")}>
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
