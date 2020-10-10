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
    header,
    horizontal,
    vertical,
    viewportWidth,
    rows,
    viewportHeight,
    headerHeight,
  } = state;
  const {
    maxSize: maxWidth,
    cumulsSize: cumulColumnsWidth,
    scrollPercent: horizontalScrollPercent,
  } = horizontal;
  const {
    maxSize: maxHeight,
    cumulSize: cumulRowsHeight,
    scrollPercent: verticalScrollPercent,
  } = vertical;
  const onHorizontalScrollCallback = useCallback(
    function (percent) {
      dispatch(actions.onHorizontalScroll(percent));
    },
    [dispatch]
  );

  const onVerticalScrollCallback = useCallback(
    function (percent) {
      dispatch(actions.onVerticalScroll(percent));
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

  useEffect(
    function () {
      dispatch(actions.onRefreshLines());
    },
    [
      verticalScrollPercent,
      maxHeight,
      cumulRowsHeight,
      viewportHeight,
      dispatch,
    ]
  );

  return (
    <div className={classnames("react-large-table", className)}>
      <ReactScrollable
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onHorizontalScroll={onHorizontalScrollCallback}
        onVerticalScroll={onVerticalScrollCallback}
        verticalScrollPercentRequest={undefined}
        horizontalScrollPercentRequest={undefined}
        onResize={onResizeCallback}
      >
        <Table>
          <THead>
            <Tr heigh={headerHeight}>
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
