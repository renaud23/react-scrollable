import React, { useReducer, useEffect } from "react";
import {
  TableContext,
  reducer,
  INITIAL_STATE,
  actions,
} from "./state-management";
import { ReactLargeTableContainer } from "./containers";
import "./react-large-table.scss";

function ReactLargeTable({ data = {}, headerHeight, className }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { rows, header } = data;

  useEffect(
    function () {
      dispatch(actions.onInit({ rows, header, headerHeight }));
    },
    [rows, header, headerHeight]
  );

  return (
    <TableContext.Provider value={[state, dispatch]}>
      <ReactLargeTableContainer className={className} />
    </TableContext.Provider>
  );
}

export default ReactLargeTable;
