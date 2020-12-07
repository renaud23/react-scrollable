import React, { useState } from "react";
import ReactRowable from "../react-rowable";
import RowableScrollableContent from "./rowable-scrollable-content";
import "./react-rowable.scss";
import "./custom-scrollable.scss";

function buildScrollableData(nb, size) {
  return {
    max: nb,
    maxSize: nb * size,
    cumulsSize: new Array(nb).fill(null).reduce(
      function (a, _, i) {
        return [...a, (i + 1) * size];
      },
      [0]
    ),
  };
}

export function ReactRowableDefault() {
  const [vertical] = useState(buildScrollableData(100, 60));
  const [horizontal] = useState(buildScrollableData(100, 200));
  return (
    <div className="simple-scrollable-example-container">
      <ReactRowable id={"id"} vertical={vertical} horizontal={horizontal}>
        <RowableScrollableContent vertical={vertical} horizontal={horizontal} />
      </ReactRowable>
    </div>
  );
}

export default {
  title: "react-rowable",
  component: ReactRowable,
  argTypes: {},
};
