import React from "react";
import ReactLargeTree from "../react-large-tree";
import { generateRandomTree, computeSize } from "./commons-stories";
import "./custom-scrollable.scss";

const tree = computeSize(generateRandomTree(3));

export function DefaultTree() {
  return (
    <div className="simple-scrollable-example">
      <ReactLargeTree root={tree} />
    </div>
  );
}

const STORY = {
  title: "react-large-tree",
  component: ReactLargeTree,
  argTypes: {},
};

export default STORY;
