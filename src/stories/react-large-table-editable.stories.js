import React, { useState } from "react";
import ReactLargeTableEditable from "../react-large-table-editable";
import { generateRandomTableData } from "./commons-stories";
import classnames from "classnames";
import "./react-rowable-container.scss";
import "./custom-large-table.scss";
import "./excel-theme.scss";
import "./custom-cell-renderer.scss";
import "./editable-cell.scss";

const __WIDTH__ = 30;
const __HEIGHT__ = 1000;

const data = generateRandomTableData(__WIDTH__, __HEIGHT__);

function CustomCellRenderer({ cell, height }) {
  const { value, type } = cell;
  return (
    <span
      style={{ lineHeight: `${height}px` }}
      className={classnames("custom-cell-renderer", type)}
    >
      {value}
    </span>
  );
}

export function EditableTable() {
  const [last, setLast] = useState(undefined);
  return (
    <>
      <p>{last ? `${last.value} at [${last.row}, ${last.column}]` : null}</p>
      <div className="rowable-container-example">
        <ReactLargeTableEditable
          className="excel-theme"
          data={data}
          headerHeight={50}
          cellRenderer={CustomCellRenderer}
          rowNums={true}
          getValue={({ value }) => value}
          setValue={(o, value) => (typeof o === "object" ? { ...o, value } : o)}
          onChange={(value, row, column) => setLast({ value, row, column })}
        />
      </div>
    </>
  );
}

export default {
  title: "react-large-table-editable",
  component: ReactLargeTableEditable,
  argTypes: {},
};
