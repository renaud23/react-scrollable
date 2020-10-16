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
import "./react-large-table.scss";

function ReactLargeTable({
  data,
  headerHeight,
  treeSize = true,
  className,
  cellRenderer = DefaultCellRenderer,
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
            id={id}
          />
        </LargeScrollableContainer>
      </div>
    </TableContext.Provider>
  );
}

export default ReactLargeTable;
