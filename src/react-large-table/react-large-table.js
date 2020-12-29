import React, { useReducer, useEffect, useCallback } from "react";
import ReactRowable from "../react-rowable";
import TableContent from "./table-content";
import PropTypes from "prop-types";
import { RowNums } from "./table-components";
import {
  TableContext,
  reducers,
  INITIAL_STATE,
  actions,
} from "./state-management";
import classnames from "classnames";
import { DefaultCellRenderer } from "./table-components";
import { DefaultHeaderRenderer, RowNumRenderer } from "./table-components";
import "./react-large-table.scss";

function onEmptyHook() {}

function ReactLargeTable({
  data,
  headerHeight,
  rowHeight,
  treeSize,
  className,
  cellRenderer,
  headerRenderer,
  rowNumRenderer,
  rowNums,
  onChangeData,
  onMouseLeave,
  onMouseEnter,
  onFocus,
  onBlur,
  horizontalScrollRequest,
  verticalScrollRequest,
}) {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);
  const { vertical, horizontal, id } = state;
  const { header, rows } = state;

  useEffect(
    function () {
      if (header && rows) {
        onChangeData(header, rows);
      }
    },
    [header, rows, onChangeData]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshData(data, headerHeight, rowHeight, treeSize));
    },
    [data, headerHeight, rowHeight, treeSize, dispatch]
  );

  useEffect(
    function () {
      if (verticalScrollRequest) {
        dispatch(actions.onVerticalScrollRequest(verticalScrollRequest));
      }
    },
    [verticalScrollRequest, dispatch]
  );

  useEffect(
    function () {
      if (horizontalScrollRequest) {
        dispatch(actions.onHorizontalScrollRequest(horizontalScrollRequest));
      }
    },
    [horizontalScrollRequest, dispatch]
  );

  const onResizeCallback = useCallback(
    function (width, height) {
      return [width, height - headerHeight];
    },
    [headerHeight]
  );
  //
  return (
    <TableContext.Provider value={[state, dispatch]}>
      <div
        className={classnames("react-large-table", className, {
          "with-row-nums": rowNums,
        })}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
      >
        {rowNums ? <RowNums rowNumRenderer={rowNumRenderer} /> : null}
        <ReactRowable
          id={id}
          vertical={vertical}
          horizontal={horizontal}
          onResize={onResizeCallback}
          treeSize={treeSize}
          onFocus={onFocus}
          onBlur={onBlur}
        >
          <TableContent
            rows={rows}
            header={header}
            headerHeight={headerHeight}
            rowHeight={rowHeight}
            cellRenderer={cellRenderer}
            headerRenderer={headerRenderer}
            id={id}
            rowNumRenderer={rowNumRenderer}
          />
        </ReactRowable>
      </div>
    </TableContext.Provider>
  );
}

ReactLargeTable.propTypes = {
  data: PropTypes.shape({
    header: PropTypes.arrayOf(
      PropTypes.shape({
        __width: PropTypes.number.isRequired,
        path: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    rows: PropTypes.arrayOf(
      PropTypes.shape({
        __height: PropTypes.number.isRequired,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.object,
          PropTypes.number,
        ]),
      })
    ),
  }),
  headerHeight: PropTypes.number.isRequired,
  rowHeight: PropTypes.number,
  treeSize: PropTypes.bool,
  cellRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  headerRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  rowNumRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  rowNums: PropTypes.bool,
  onchangeData: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

ReactLargeTable.defaultProps = {
  data: { header: undefined, rows: undefined },
  treeSize: false,
  cellRenderer: DefaultCellRenderer,
  headerRenderer: DefaultHeaderRenderer,
  rowNumRenderer: RowNumRenderer,
  rowNums: false,
  rowHeight: undefined,
  onChangeData: onEmptyHook,
  onMouseLeave: onEmptyHook,
  onMouseEnter: onEmptyHook,
  onFocus: onEmptyHook,
  onBlur: onEmptyHook,
};

export default ReactLargeTable;
