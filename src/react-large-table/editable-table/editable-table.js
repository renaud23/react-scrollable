import React, { useMemo, useState, useCallback } from "react";
import ReactLargeTable from "../react-large-table";
import createEditableCellRenderer from "./create-editable-cell-renderer";
import { DefaultCellRenderer } from "../containers";
import "./editable-cell.scss";

function refillRows(rows, newCell, row, path) {
  const next = [...rows];
  rows[row][path] = newCell;

  return next;
}

function Writable({
  data,
  rowNums = true,
  className,
  headerHeight = 50,
  cellRenderer = DefaultCellRenderer,
  setValue = () => null,
  getValue = () => null,
}) {
  const [data_, setData] = useState(data);
  const { rows, header } = data_;
  /* */
  const setValueCallback = useCallback(
    function (cell, value, row, column) {
      const current = getValue(cell);
      if (current !== value) {
        const newCell = setValue(cell, value);
        const { path } = header[column];
        setData({ header, rows: refillRows(rows, newCell, row, path) });
      }
    },
    [setValue, getValue, rows, header]
  );

  /* */
  const cellMemo = useMemo(
    function () {
      return createEditableCellRenderer(
        cellRenderer,
        getValue,
        setValueCallback
      );
    },
    [cellRenderer, getValue, setValueCallback]
  );

  return (
    <ReactLargeTable
      className={className}
      data={data_}
      headerHeight={headerHeight}
      rowNums={rowNums}
      cellRenderer={cellMemo}
    />
  );
}

export default Writable;
