import React from "react";
import BodyContent from "./body-content";
import HeaderContent from "./header-content";
import { Table, Thead, Tr, Tbody } from "../table-components";

function TableContent({
  header,
  rows,
  headerHeight,
  cellRenderer,
  id,
  marginLeft,
  horizontalStart,
  horizontalNb,
  marginTop,
  verticalStart,
  verticalNb,
}) {
  return (
    <Table id={id}>
      <Thead height={headerHeight} marginLeft={marginLeft}>
        <Tr height={headerHeight}>
          <HeaderContent
            header={header}
            start={horizontalStart}
            nb={horizontalNb}
          />
        </Tr>
      </Thead>
      <Tbody marginTop={marginTop + headerHeight} marginLeft={marginLeft}>
        <BodyContent
          rows={rows}
          header={header}
          startRow={verticalStart}
          nbRows={verticalNb}
          startColumns={horizontalStart}
          nbColumns={horizontalNb}
          cellRenderer={cellRenderer}
        />
      </Tbody>
    </Table>
  );
}

export default TableContent;
