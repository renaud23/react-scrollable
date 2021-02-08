import React from "react";
import ReactLargeList from "../react-large-list";
import { generateRandomList } from "./commons-stories";
import "./custom-large-list.scss";

const __LIST_LENGTH__ = 10000;
const randomList = generateRandomList(__LIST_LENGTH__);

export function DefaultLargeList() {
  return (
    <>
      <p>A large list of {__LIST_LENGTH__} items.</p>
      <div className="react-large-list-container">
        <ReactLargeList list={randomList} />
      </div>
    </>
  );
}

export function CustomItem() {
  function renderer({ item, height }) {
    const { label } = item;
    return (
      <div
        style={{
          backgroundColor: "IndianRed",
          height: "100%",
          lineHeight: `${height}px`,
        }}
      >
        {label}
      </div>
    );
  }
  return (
    <>
      <p>A large list of {__LIST_LENGTH__} items.</p>
      <div className="react-large-list-container">
        <ReactLargeList list={randomList} itemRenderer={renderer} />
      </div>
    </>
  );
}

export default {
  title: "react-large-list",
  component: ReactLargeList,
  argTypes: {},
};
