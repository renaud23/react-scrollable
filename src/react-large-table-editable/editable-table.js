import React, { useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import ReactLargeTable, { DefaultCellRenderer } from "../react-large-table";
import createEditableCellRenderer from "./create-editable-cell-renderer";
import "./editable-cell.scss";

function refillRows(rows, newCell, row, path) {
  const next = [...rows];
  rows[row][path] = newCell;

  return next;
}

function Writable({
  data,
  rowNums,
  className,
  headerHeight,
  cellRenderer,
  setValue,
  getValue,
  onChange,
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
        setData({
          header,
          rows: refillRows(rows, newCell, row, path),
        });
        onChange(value, row, column);
      }
    },
    [setValue, onChange, getValue, rows, header]
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

Writable.propTypes = {
  data: PropTypes.shape({
    header: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
  }).isRequired,
  setValue: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
  rowNums: PropTypes.bool,
  className: PropTypes.string,
  headerHeight: PropTypes.number,
  cellRenderer: PropTypes.func,

  onChange: PropTypes.func,
};

Writable.defaultProps = {
  cellRenderer: DefaultCellRenderer,
  rowNums: true,
  className: undefined,
  headerHeight: 30,
};

export default Writable;
