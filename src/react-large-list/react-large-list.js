import React, { useState, useEffect } from "react";
import classnames from "classnames";
import ListContent from "./list-content";
import { OffsetChar } from "../commons-scrollable";
import LargeScrollableContainer from "../react-large-scrollable";
import "./react-large-list.scss";

let __REACT_LARGE_LIST_INDEX__ = 1;

function getId() {
  return `react-large-list-${__REACT_LARGE_LIST_INDEX__++}`;
}

function initializeScrollable() {
  return { max: undefined, maxSize: undefined, cumulsSize: undefined };
}

function getHeight({ __height }) {
  return __height || 0;
}

function getWidth({ __width }) {
  return __width || 0;
}

function computeCumulsSize(array, getSize) {
  return array.reduce(
    function (current, o) {
      const size = getSize(o);
      const last = current[current.length - 1];
      return [...current, last + size];
    },
    [0]
  );
}

function computeVertical(list) {
  const cumulsSize = computeCumulsSize(list, getHeight);
  const max = list.length;
  const maxSize = cumulsSize[cumulsSize.length - 1];
  return { cumulsSize, max, maxSize };
}

function computeHorizontal(list, offsetChar) {
  const max = list.reduce(function (curr, o) {
    return Math.max(getWidth(o), curr);
  }, 0);
  const cumulsSize = computeCumulsSize(
    new Array(max).fill(null),
    () => offsetChar
  );
  const maxSize = cumulsSize[max - 1];
  return { cumulsSize, max, maxSize };
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
