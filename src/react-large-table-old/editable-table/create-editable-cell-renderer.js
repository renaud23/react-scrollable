import React from "react";
import classnames from "classnames";
import EditableCell from "./editable-cell";

function create(Cell, getValue, setValue) {
  return function EditableCellRenderer({ cell, row, column, width, height }) {
    const { editable = false } = cell;
    if (editable) {
      return (
        <EditableCell
          cell={cell}
          row={row}
          column={column}
          width={width}
          height={height}
          getValue={getValue}
          setValue={setValue}
          cellRenderer={Cell}
        />
      );
    }
    return (
      <span className={classnames("excel-theme-cell")}>
        <Cell
          cell={cell}
          row={row}
          column={column}
          width={width}
          height={height}
        />
      </span>
    );
  };
}

export default create;
