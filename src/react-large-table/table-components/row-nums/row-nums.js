import React, { useContext } from "react";
import { TableContext } from "../../state-management";
import RowNumContainer from "./row-num-container";
import { getHeight } from "../../commons-table";
import Row from "./row";
import "./row-nums.scss";

function RowNums({ rowNumRenderer }) {
  const [state] = useContext(TableContext);
  const { headerHeight, rowNums, rows, rowHeight } = state;
  const { nb, start, margin } = rowNums;

  if (nb && rows.length) {
    const nums = new Array(nb).fill(null).map(function (_, i) {
      const __height = rowHeight || getHeight(rows[start + i]);
      return (
        <Row
          rowNumRenderer={rowNumRenderer}
          key={i}
          height={__height}
          index={start + i}
        />
      );
    });
    return (
      <RowNumContainer margin={margin} headerHeight={headerHeight}>
        {nums}
      </RowNumContainer>
    );
  }
  return (
    <RowNumContainer
      margin={margin}
      headerHeight={headerHeight}
    ></RowNumContainer>
  );
}

export default RowNums;
