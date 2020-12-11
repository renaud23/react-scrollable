import React, { useState, useEffect } from "react";
import ListContent from "./list-content";
import { OffsetChar } from "../commons-scrollable";
import ReactRowable from "../react-rowable";
import { computeVertical, computeHorizontal } from "./commons-list";
import "./react-large-list.scss";

let __REACT_LARGE_LIST_INDEX__ = 1;

function getId() {
  return `react-large-list-${__REACT_LARGE_LIST_INDEX__++}`;
}

function initializeScrollable() {
  return { max: undefined, maxSize: undefined, cumulsSize: undefined };
}

/* */
function ReactLargeList({ className, list, offsetChar }) {
  const [id] = useState(() => getId());
  const [vertical, setVertical] = useState(initializeScrollable);
  const [horizontal, setHorizontal] = useState(initializeScrollable);
  const [focused, setFocused] = useState(false);

  useEffect(
    function () {
      setVertical(computeVertical(list));
      setHorizontal(computeHorizontal(list, offsetChar));
    },
    [list, offsetChar]
  );

  const onFocus = function () {
    setFocused(true);
  };
  const onBlur = function () {
    setFocused(false);
  };
  return (
    <ReactRowable
      id={id}
      vertical={vertical}
      horizontal={horizontal}
      onFocus={onFocus}
      onBlur={onBlur}
      className="react-large-list"
    >
      <ListContent
        id={id}
        list={list}
        offsetChar={offsetChar}
        focused={focused}
      />
    </ReactRowable>
  );
}

export default function WrappingOffsetchar(props) {
  return (
    <OffsetChar>
      <ReactLargeList {...props} />
    </OffsetChar>
  );
}
