import React, { useMemo, useEffect, useCallback, useReducer } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import ReactLargeTable, { DefaultCellRenderer } from "../react-large-table";
import createEditableCellRenderer from "./create-editable-cell-renderer";
import {
  reducers,
  INITIAL_STATE,
  actions,
  createTableMiddleware,
  EditableContext,
} from "./state-management";

import "./editable-cell.scss";
import "./editable-table.scss";

function refillRows(rows, newCell, row, path) {
  const next = [...rows];
  rows[row][path] = newCell;

  return next;
}

function Table({
  data: dataFromProps,
  rowNums,
  className,
  headerHeight,
  cellRenderer,
  setValue,
  getValue,
  onChange,
}) {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);
  const { data } = state;
  const onChangeData = useCallback(function (h, r) {
    dispatch(actions.onUpdateData({ header: h, rows: r }));
  }, []);
  /* */
  const setValueCallback = useCallback(
    function (cell, value, row, column) {
      const current = getValue(cell);
      if (current !== value) {
        const newCell = setValue(cell, value);
        const { rows, header } = data;
        const { path } = header[column];
        dispatch(
          actions.onUpdateData({
            header,
            rows: refillRows(rows, newCell, row, path),
          })
        );
        onChange(value, row, column);
      }
    },
    [setValue, onChange, getValue, data]
  );

  /* */
  useEffect(
    function () {
      dispatch(actions.onUpdateData(dataFromProps));
    },
    [dataFromProps]
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

  const middlewareMemo = useMemo(
    function () {
      return createTableMiddleware(dispatch);
    },
    [dispatch]
  );

  return (
    <EditableContext.Provider value={[state, dispatch]}>
      <ReactLargeTable
        className={classnames("editable-table", className)}
        data={data}
        headerHeight={headerHeight}
        rowNums={rowNums}
        cellRenderer={cellMemo}
        onChangeData={onChangeData}
        middleware={middlewareMemo}
      />
    </EditableContext.Provider>
  );
}

Table.propTypes = {
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

Table.defaultProps = {
  cellRenderer: DefaultCellRenderer,
  rowNums: true,
  className: undefined,
  headerHeight: 30,
};

export default Table;
