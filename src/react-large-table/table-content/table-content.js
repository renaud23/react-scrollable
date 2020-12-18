import React, { useEffect, useContext } from "react";
import BodyContent from "./body-content";
import HeaderContent from "./header-content";
import { Table, Thead, Tr, Tbody } from "../table-components";
import { TableContext, actions } from "../state-management";

function TableContent({
  header,
  rows,
  headerHeight,
  rowHeight,
  cellRenderer,
  headerRenderer,
  id,
  marginLeft,
  horizontalStart,
  horizontalNb,
  marginTop,
  verticalStart,
  verticalNb,
}) {
  const dispatch = useContext(TableContext)[1];
  useEffect(
    function () {
      dispatch(actions.onVerticalScroll(verticalStart, verticalNb, marginTop));
    },
    [verticalStart, verticalNb, marginTop, dispatch]
  );

  return (
    <Table id={id}>
      <Thead height={headerHeight} marginLeft={marginLeft}>
        <Tr height={headerHeight}>
          <HeaderContent
            header={header}
            start={horizontalStart}
            nb={horizontalNb}
            headerRenderer={headerRenderer}
          />
        </Tr>
      </Thead>
      <Tbody marginTop={marginTop + headerHeight} marginLeft={marginLeft}>
        <BodyContent
          rows={rows}
          header={header}
          startRow={verticalStart}
          nbRows={verticalNb}
          rowHeight={rowHeight}
          startColumns={horizontalStart}
          nbColumns={horizontalNb}
          cellRenderer={cellRenderer}
        />
      </Tbody>
    </Table>
  );
}

function emptyCallback() {}

TableContent.defaultProps = {
  focused: false,
  onFocus: emptyCallback,
  onBlur: emptyCallback,
};

export default TableContent;
