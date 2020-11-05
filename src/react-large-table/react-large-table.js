import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import LargeScrollableContainer from "../react-large-scrollable";
import TableContent from "./table-content";
import PropTypes from "prop-types";
import {
  TableContext,
  reducers,
  INITIAL_STATE,
  actions,
} from "./state-management";
import classnames from "classnames";
import { DefaultCellRenderer } from "./table-components";
import { RowNums } from "./table-components";
import { DefaultHeaderRenderer, RowNumRenderer } from "./table-components";
import "./react-large-table.scss";

function onChangeDataDefault() {}

function onMouseLeaveDefault() {}

const middlewareDefault = (next) => (action) => next(action);

function ReactLargeTable({
  data,
  headerHeight,
  treeSize,
  className,
  cellRenderer,
  headerRenderer,
  rowNums,
  onChangeData,
  middleware,
  onMouseLeave,
  rowNumRenderer,
}) {
  const [state, __dispatch] = useReducer(reducers, INITIAL_STATE);
  const { vertical, horizontal, id } = state;
  const { header, rows } = state;

  const dispatch = useMemo(
    function () {
      return middleware(__dispatch);
    },
    [__dispatch, middleware]
  );

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
      dispatch(actions.onRefreshData(data, headerHeight, treeSize));
    },
    [data, headerHeight, treeSize, dispatch]
  );

  const onResizeCallback = useCallback(
    function (width, height) {
      return [width, height - headerHeight];
    },
    [headerHeight]
  );
  return (
    <TableContext.Provider value={[state, dispatch]}>
      <div
        className={classnames("react-large-table", className)}
        onMouseLeave={onMouseLeave}
      >
        {rowNums ? <RowNums rowNumRenderer={rowNumRenderer} /> : null}
        <LargeScrollableContainer
          id={id}
          vertical={vertical}
          horizontal={horizontal}
          onResize={onResizeCallback}
          treeSize={treeSize}
        >
          <TableContent
            rows={rows}
            header={header}
            headerHeight={headerHeight}
            cellRenderer={cellRenderer}
            headerRenderer={headerRenderer}
            id={id}
          />
        </LargeScrollableContainer>
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
  treeSize: PropTypes.bool,
  cellRenderer: PropTypes.func,
  headerRenderer: PropTypes.func,
  rowNumRenderer: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  rowNums: PropTypes.bool,
  onchangeData: PropTypes.func,
};

ReactLargeTable.defaultProps = {
  data: { header: undefined, rows: undefined },
  treeSize: true,
  cellRenderer: DefaultCellRenderer,
  headerRenderer: DefaultHeaderRenderer,
  rowNumRenderer: RowNumRenderer,
  rowNums: false,
  onChangeData: onChangeDataDefault,
  middleware: middlewareDefault,
  onMouseLeave: onMouseLeaveDefault,
};

export default ReactLargeTable;
