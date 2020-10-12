import React, { useContext } from "react";
import classnames from "classnames";
import { TableContext } from "../../state-management";
import { safeCss } from "../../commons";
import "./row-nums.scss";

function Corner({ height }) {
  return (
    <div
      className="header-corner-container"
      style={{ height: safeCss(height) }}
      aria-hidden={true}
    >
      <div className="header-corner"></div>
    </div>
  );
}

function Row({ height, index }) {
  return (
    <div
      style={{ height: safeCss(height) }}
      className={classnames("row-nums-rows-container", {
        odd: index % 2 === 1,
      })}
    >
      <div
        style={{ lineHeight: `${safeCss(height)}px` }}
        className="row-nums-rows-nums"
      >
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
      const row = rows[start + i];
      const { __height } = row;
      return <Row key={i} height={__height} index={start + i + 1} />;
    });
    return (
      <div className="row-nums">
        <Corner height={headerHeight} />
        <div
          className="row-nums-rows"
          style={{ marginTop: safeCss(margin + headerHeight) }}
        >
          {nums}
        </div>
      </div>
    );
  }
  return (
    <div className="row-nums">
      <div
        className="header-corner"
        style={{ height: safeCss(headerHeight) }}
      ></div>
    </div>
  );
}

export default RowNums;
