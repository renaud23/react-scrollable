import React, { useContext } from "react";
import { TableContext } from "../../state-management";
import { safeCss } from "../../../commons-scrollable";
import Row from "./row";
import "./row-nums.scss";

function RowNumContainer({ children, margin, headerHeight }) {
  return (
    <div className="row-nums">
      <div
        className="header-corner-container"
        style={{ height: safeCss(headerHeight) }}
        aria-hidden={true}
      >
        <div className="header-corner"></div>
      </div>
      <div
        className="row-nums-body"
        style={{ marginTop: safeCss(margin + headerHeight) }}
      >
        {children}
      </div>
    </div>
  );
}

function RowNums() {
  const [state] = useContext(TableContext);
  const { headerHeight, rowNums, rows } = state;
  const { nb, start, margin } = rowNums;
  if (nb && rows.length) {
    const nums = new Array(nb).fill(null).map(function (_, i) {
      const { __height } = rows[start + i];
      return <Row key={i} height={__height} index={start + i} />;
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
