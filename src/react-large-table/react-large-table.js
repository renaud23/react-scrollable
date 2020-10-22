import React, { useReducer, useEffect, useCallback } from "react";
import LargeScrollableContainer from "../react-large-scrollable";
import TableContent from "./table-content";
import {
  TableContext,
  reducers,
  INITIAL_STATE,
  actions,
} from "./state-management";
import classnames from "classnames";
import { DefaultCellRenderer } from "./table-components";
import { RowNums } from "./table-components";
import { DefaultHeaderRenderer } from "./table-components";
import "./react-large-table.scss";

function ReactLargeTable({
  data,
  headerHeight,
  treeSize,
  className,
  cellRenderer,
  headerRenderer,
  rowNums,
}) {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);
  const { vertical, horizontal, id } = state;
  const { header, rows } = state;

  useEffect(
    function () {
      dispatch(actions.onRefreshData(data, headerHeight, treeSize));
    },
    [data, headerHeight, treeSize]
  );

  const onResizeCallback = useCallback(
    function (width, height) {
      return [width, height - headerHeight];
    },
    [headerHeight]
  );
  return (
    <TableContext.Provider value={[state, dispatch]}>
      <div className={classnames("react-large-table", className)}>
        {rowNums ? <RowNums /> : null}
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

ReactLargeTable.defaultProps = {
  treeSize: true,
  cellRenderer: DefaultCellRenderer,
  headerRenderer: DefaultHeaderRenderer,
  rowNums: false,
};

export default ReactLargeTable;
