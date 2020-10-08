import React, { useCallback, useContext, useEffect } from "react";
import ReactScrollable from "../../react-scrollable";
import Table from "../components/table";
import THead from "../components/t-head";
import Tr from "../components/tr";
import TBody from "../components/t-body";
import BodyContent from "./body-content";
import HeaderContent from "./header-content";
import { TableContext, actions } from "../state-management";
import classnames from "classnames";

function ReactLargeTableContainer({ className }) {
  const [state, dispatch] = useContext(TableContext);
  const {
    maxWidth,
    header,
    cumulColumnsWidth,
    horizontalScrollPercent,
    viewportWidth,
    rows,
  } = state;

  const onHorizontalScrollCallback = useCallback(
    function (percent) {
      dispatch(actions.onHorizontalScroll(percent));
    },
    [dispatch]
  );

  const onResizeCallback = useCallback(
    function (width, height) {
      dispatch(actions.onResize(width, height));
    },
    [dispatch]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshHeader());
    },
    [header, dispatch]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshRows());
    },
    [rows, dispatch]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshColumns());
    },
    [
      horizontalScrollPercent,
      maxWidth,
      cumulColumnsWidth,
      viewportWidth,
      dispatch,
    ]
  );

  return (
    <div className={classnames("react-large-table", className)}>
      <ReactScrollable
        maxWidth={maxWidth}
        maxHeight={10000}
        onHorizontalScroll={onHorizontalScrollCallback}
        onVerticalScroll={() => null}
        verticalScrollPercentRequest={undefined}
        horizontalScrollPercentRequest={undefined}
        onResize={onResizeCallback}
      >
        <Table>
          <THead>
            <Tr>
              <HeaderContent />
            </Tr>
          </THead>
          <TBody>
            <BodyContent />
          </TBody>
        </Table>
      </ReactScrollable>
    </div>
  );
}

export default ReactLargeTableContainer;
