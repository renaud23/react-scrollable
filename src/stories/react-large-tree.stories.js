import React from "react";
import ReactLargeTree from "../react-large-tree";
import getRandomTree, { computeSize } from "./random-tree-data";
import "./custom-scrollable.scss";

const tree = computeSize(getRandomTree(3));

export function DefaultTree() {
  return (
    <div className="simple-scrollable-example">
      <ReactLargeTree root={tree} />
    </div>
  );
}

export default {
  title: "react-large-tree",
  component: ReactLargeTree,
  argTypes: {},
};
