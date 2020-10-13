import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import ReactLargeTable from "./react-large-table";
import { safeCss } from "./commons";
import classnames from "classnames";
import { DefaultCellRenderer } from "../react-large-table/containers";
import "./editable-cell.scss";

function InputField({ cell, setValue, row, column, getValue, height, onBlur }) {
  const inputEl = useRef();
  const [value, setValue_] = useState(getValue(cell));

  console.log(row, column);

  /* */
  const onFocusCallback = useCallback(
    function () {
      const { current } = inputEl;
      if (current) {
        current.setSelectionRange(0, current.selectionStart);
      }
    },
    [inputEl]
  );

  /* */
  const onChangeCallback = useCallback(function (e) {
    setValue_(e.target.value);
  }, []);

  /* */
  const onBlurCallback = useCallback(
    function (e) {
      setValue(cell, value, row, column);
      onBlur();
    },
    [cell, value, setValue, onBlur, row, column]
  );

  /* */
  useEffect(
    function () {
      const { current } = inputEl;
      if (current) {
        current.focus();
      }
    },
    [inputEl]
  );

  return (
    <input
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
      ref={inputEl}
      value={value}
      style={{ lineHeight: safeCss(height) }}
      onBlur={onBlurCallback}
      onChange={onChangeCallback}
      onFocus={onFocusCallback}
    />
  );
}
/* ************************* */
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
    <span
      tabIndex="0"
      className={classnames("editable-cell", "excel-theme-cell")}
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

function create(Cell, getValue, setValue) {
  return function WritableCellRenderer({ cell, row, column, width, height }) {
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
      return create(cellRenderer, getValue, setValueCallback);
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
