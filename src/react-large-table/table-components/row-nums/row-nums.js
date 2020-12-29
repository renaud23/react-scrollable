import React, { useContext } from "react";
import { TableContext } from "../../state-management";
import { safeCss } from "../../../commons-scrollable";
import { getHeight } from "../../commons-table";
import Row from "./row";
import "./row-nums.scss";

function RowNumContainer({ children, headerHeight, margin }) {
  return (
    <div className="row-nums">
      <div
        className="header-corner-container"
        style={{ height: safeCss(headerHeight) }}
        aria-hidden={true}
      >
        <div className="header-corner"></div>
      </div>
      <div className="row-nums-body">
        <div className="row-nums-list" style={{ marginTop: safeCss(margin) }}>
          {children}
        </div>
      </div>
    </div>
  );
}

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
