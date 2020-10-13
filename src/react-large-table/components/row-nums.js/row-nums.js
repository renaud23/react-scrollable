import React, { useContext } from "react";
import classnames from "classnames";
import { TableContext } from "../../state-management";
import { safeCss } from "../../commons";
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

function Row({ height, index }) {
  return (
    <div
      style={{ height: safeCss(height) }}
      className={classnames("row-container", {
        odd: index % 2 === 1,
      })}
    >
      <div style={{ lineHeight: `${safeCss(height)}px` }} className="row">
        {index}
      </div>
    </div>
  );
}

function RowNums() {
  const [state] = useContext(TableContext);
  const { headerHeight, vertical, rows } = state;
  const { nb, start, margin } = vertical;
  if (nb && rows.length) {
    const nums = new Array(nb).fill(null).map(function (_, i) {
      const { __height } = rows[start + i];
      return <Row key={i} height={__height} index={start + i + 1} />;
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
