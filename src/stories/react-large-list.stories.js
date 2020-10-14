import React from "react";
import ReactLargeList from "../react-large-list";
import generateRandomList from "./random-entities";
import "./custom-large-list.scss";

const __LIST_LENGTH__ = 100;
const randomList = generateRandomList(__LIST_LENGTH__);

export function DefaultLargeList() {
  return (
    <div className="react-large-list-container">
      <ReactLargeList list={randomList} />
    </div>
  );
}

export default {
  title: "react-large-list",
  component: ReactLargeList,
  argTypes: {},
};
