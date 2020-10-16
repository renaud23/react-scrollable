import React from "react";
import ReactLargeTable from "../react-large-table";
import generate from "./random-table-data";
import classnames from "classnames";
import "./custom-large-table.scss";
import "./excel-theme.scss";
import "./custom-cell-renderer.scss";

const __WIDTH__ = 20;
const __HEIGHT__ = 200;

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
        <ReactLargeTable
          className="custom-large-table-theme"
          data={data}
          headerHeight={50}
          cellRenderer={CustomCellRenderer}
          rowNums={true}
        />
      </div>
    </>
  );
}

export function CustomCellTable() {
  return (
    <>
      <p>
        A large table of {__WIDTH__} columns and {__HEIGHT__} rows,
        {__WIDTH__ * __HEIGHT__} cells.
      </p>
      <div className="default-table-container">
        <ReactLargeTable
          className="custom-large-table-theme"
          data={data}
          headerHeight={50}
          cellRenderer={CustomCellRenderer}
        />
      </div>
    </>
  );
}

// export function EditableTable() {
//   const [last, setLast] = useState(undefined);
//   return (
//     <>
//       <p>{last ? `${last.value} at [${last.row}, ${last.column}]` : null}</p>
//       <div className="default-table-container">
//         <ReactLargeEditableTable
//           className="excel-theme"
//           data={data}
//           headerHeight={50}
//           cellRenderer={CustomCellRenderer}
//           rowNums={true}
//           getValue={({ value }) => value}
//           setValue={(o, value) => (typeof o === "object" ? { ...o, value } : o)}
//           onChange={(value, row, column) => setLast({ value, row, column })}
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
