import React from "react";
import classnames from "classnames";
import { safeCss } from "../commons-scrollable";

function getIndent(level, pattern) {
  if (level) {
    return new Array(level).fill(null).map(function (_, i) {
      const last = i === level - 1;
      const zero = pattern[i] === "0";
      const bar = !last && !zero;
      const tee = last && !zero;
      const end = last && zero;
      return (
        <span
          key={i}
          className={classnames("tree-node-indent", { bar, tee, end })}
        ></span>
      );
    });
  }
  return [];
}

function DefaultRowRenderer({ row }) {
  const { level, label, pattern } = row;
  return (
    <div className="default-row-renderer">
      {getIndent(level, pattern)}
      <span className="libelle">{label}</span>
    </div>
  );
}

function makeUl(rows = [], RowRenderer = DefaultRowRenderer) {
  const li = rows.map(function (row) {
    const { index, __height } = row;
    return (
      <li style={{ height: safeCss(__height) }} key={index}>
        <RowRenderer row={row} />
      </li>
    );
  });
  return li;
}

function Content({ rows, verticalNb, verticalStart, marginTop, rowRenderer }) {
  if (rows && rows.length) {
    const subRows = rows.reduce(function (a, row) {
      const { index } = row;
      if (index >= verticalStart && index < verticalStart + verticalNb) {
        return [...a, row];
      }
      return a;
    }, []);
    const content = makeUl(subRows, rowRenderer);

    return (
      <ul
        className="react-large-tree-content"
        style={{ marginTop: safeCss(marginTop) }}
      >
        {content}
      </ul>
    );
  }

  return <ul className="react-large-tree-content"></ul>;
}

export default Content;
