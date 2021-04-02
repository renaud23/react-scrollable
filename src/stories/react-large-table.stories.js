import React, { useState } from "react";
import ReactLargeTable from "../react-large-table";
import { generateRandomTableData } from "./commons-stories";
import classnames from "classnames";
import "./react-rowable-container.scss";
import "./custom-large-table.scss";
import "./excel-theme.scss";
import "./custom-cell-renderer.scss";

const __WIDTH__ = 30;
const __HEIGHT__ = 10000;

const data = generateRandomTableData(__WIDTH__, __HEIGHT__);

export function DefaultTable() {
  return (
    <>
      <p>
        A large table of {__WIDTH__} columns and {__HEIGHT__} rows,
        {__WIDTH__ * __HEIGHT__} cells.
      </p>
      <div className="rowable-container-example">
        <ReactLargeTable data={data} headerHeight={30} treeSize={false} />
      </div>
      <code>
        const data = &#123; header: [ &#123; path, label, __width, ... &#125;,
        ...], rows: [ &#123; [path]: &#123; __height,... &#125;,... &#125;,...]
        &#125;
      </code>
    </>
  );
}

function CustomCellRenderer({ cell, height }) {
  const { value, type } = cell;
  return (
    <span
      style={{ lineHeight: `${height}px` }}
      className={classnames("custom-cell-renderer", type)}
    >
      {value}
    </span>
  );
}

export function WithRowNumsTable() {
  return (
    <>
      <p>
        A large table of {__WIDTH__} columns and {__HEIGHT__} rows,
        {__WIDTH__ * __HEIGHT__} cells.
      </p>
      <div className="rowable-container-example">
        <ReactLargeTable data={data} headerHeight={50} rowNums={true} />
      </div>
    </>
  );
}

export function CustomThemeTable() {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <p>
        A large table of {__WIDTH__} columns and {__HEIGHT__} rows,
        {__WIDTH__ * __HEIGHT__} cells.
      </p>
      <div className={classnames("rowable-container-example", { focused })}>
        <ReactLargeTable
          className="custom-large-table-theme"
          data={data}
          headerHeight={50}
          cellRenderer={CustomCellRenderer}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </>
  );
}

export function FixedRowHeightTable() {
  const how = 9;
  const data__ = new Array(how).fill(null).reduce(
    function ({ header, rows }) {
      return { header, rows: [...rows, ...data.rows] };
    },
    { ...data }
  );
  return (
    <>
      <p>
        A large table of {__WIDTH__} columns and {__HEIGHT__ * (how + 1)} rows,
        {__WIDTH__ * __HEIGHT__} cells. Fixed row height, for very large table !
      </p>
      <div className="rowable-container-example">
        <ReactLargeTable
          className="custom-large-table-theme"
          data={data__}
          headerHeight={50}
          rowHeight={32}
          rowNums={true}
          cellRenderer={CustomCellRenderer}
        />
      </div>
    </>
  );
}

const STORY = {
  title: "react-large-table",
  component: ReactLargeTable,
  argTypes: {},
};

export default STORY;
