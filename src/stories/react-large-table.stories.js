import React, { useState } from "react";
import ReactLargeTable from "../react-large-table";
import generate from "./random-table-data";
import classnames from "classnames";
import "./custom-large-table.scss";
import "./excel-theme.scss";
import "./custom-cell-renderer.scss";

const __WIDTH__ = 30;
const __HEIGHT__ = 10000;

const data = generate(__WIDTH__, __HEIGHT__);

export function DefaultTable() {
  return (
    <>
      <p>
        A large table of {__WIDTH__} columns and {__HEIGHT__} rows,
        {__WIDTH__ * __HEIGHT__} cells.
      </p>
      <div className="default-table-container">
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
      <div className="default-table-container">
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
      <div className={classnames("default-table-container", { focused })}>
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
      <div className="default-table-container">
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

// const dataRowSpan = {
//   header: [
//     { label: "column A", path: "a", __width: 130, resizable: true },
//     { label: "column B", path: "b", __width: 130, resizable: true },
//   ],
//   rows: [
//     {
//       a: { value: "hello", rowSpan: 2 },
//       b: { value: "world !!!" },
//       __height: 40,
//     },
//     { b: { value: "monde !!!" }, __height: 40 },
//   ],
// };

// export function RowSpanTable() {
//   return (
//     <>
//       <div className="default-table-container">
//         <ReactLargeTable
//           data={dataRowSpan}
//           className="custom-large-table-theme"
//           headerHeight={50}
//         />
//       </div>
//     </>
//   );
// }

export default {
  title: "react-large-table",
  component: ReactLargeTable,
  argTypes: {},
};
