import React from "react";
import ReactLargeTable from "../react-large-table";
import generate from "./random-table-data";
import "./custom-large-table.scss";

const data = generate(50, 10000);

export function DefaultTable() {
  return (
    <div className="default-table-container">
      <ReactLargeTable
        className="custom-large-table-theme"
        data={data}
        headerHeight={30}
        treeSize={false}
      />
    </div>
  );
}

export default {
  title: "react-large-table",
  component: ReactLargeTable,
  argTypes: {},
};
