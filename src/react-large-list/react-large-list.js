import React, { useState, useEffect } from "react";
import classnames from "classnames";
import ListContent from "./list-content";
import { OffsetChar } from "../commons-scrollable";
import LargeScrollableContainer from "../react-large-scrollable";
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
  useEffect(
    function () {
      setVertical(computeVertical(list));
      setHorizontal(computeHorizontal(list, offsetChar));
    },
    [list, offsetChar]
  );

  return (
    <div className={classnames("react-large-list", className)}>
      <LargeScrollableContainer
        id={id}
        vertical={vertical}
        horizontal={horizontal}
      >
        <ListContent id={id} list={list} offsetChar={offsetChar} />
      </LargeScrollableContainer>
    </div>
  );
}

export default function WrappingOffsetchar(props) {
  return (
    <OffsetChar>
      <ReactLargeList {...props} />
    </OffsetChar>
  );
}
