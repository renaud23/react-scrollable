import React, { useState, useCallback, useEffect } from "react";
import { OffsetChar } from "../commons-scrollable";
import LargeScrollableContainer from "../react-large-scrollable";
import { computeCumulsSize } from "../commons-scrollable";
import "./react-large-text.scss";

let __INDEX_ID__ = 1;

function ContentText({ rows, verticalStart, marginTop, verticalNb }) {
  const lines = new Array(verticalNb).fill(null).map(function (_, i) {
    const index = verticalStart + i;
    return <div key={index}>{rows[index]}</div>;
  });
  return <div style={{ marginTop }}>{lines}</div>;
}

function initializeScrollable() {
  return { max: undefined, maxSize: undefined, cumulsSize: undefined };
}

function getId() {
  return `react-large-table-${__INDEX_ID__++}`;
}

function consumeWords(words, max, current = 0) {
  const [next, ...rest] = words;
  if (next && current + next.length < max) {
    const [s, n] = consumeWords(rest, max, current + next.length + 1);
    return [`${next} ${s}`, n];
  }
  return ["", words];
}

function fillRows(words, max) {
  // if (words.length) {
  //   const [row, rest] = consumeWords(words, max);
  //   return [row, ...fillRows(rest, max)];
  // }
  // return [];

  const rows = [];
  let stack = [...words];
  while (stack.length) {
    const [row, rest] = consumeWords(stack, max);
    rows.push(row);
    stack = rest;
  }
  return rows;
}

function computeRows(text, lineChar) {
  if (lineChar) {
    const paragraphes = text.split(`\r\n`).filter(({ length }) => length > 0);

    return paragraphes.reduce(function (current, paragraphe) {
      const words = paragraphe.split(" ");

      const rows = fillRows(words, lineChar);

      return [...current, ...rows];
    }, []);
  }
  return [];
}

function computeVertical(rows, lineHeight) {
  const max = rows.length;
  const maxSize = max * lineHeight;
  const cumulsSize = computeCumulsSize(
    new Array(max).fill(null),
    () => lineHeight
  );

  return { max, maxSize, cumulsSize };
}

function computeHorizontal(viewportWidth, offsetChar) {
  const max = Math.trunc(viewportWidth / offsetChar);
  const maxSize = viewportWidth;
  const cumulsSize = computeCumulsSize(
    new Array(max).fill(null),
    () => offsetChar
  );
  return { max, maxSize, cumulsSize };
}

function ReactLargeText({ offsetChar, value, lineHeight, onCompute }) {
  const [vertical, setVertical] = useState(initializeScrollable);
  const [rows, setRows] = useState([]);
  const [horizontal, setHorizontal] = useState(initializeScrollable);
  const [viewportWidth, setViewportWidth] = useState(undefined);
  const [id] = useState(getId);

  const onResize = useCallback(function (width) {
    setViewportWidth(width);
  }, []);

  useEffect(
    function () {
      if (viewportWidth) {
        setHorizontal(computeHorizontal(viewportWidth, offsetChar));
      }
    },
    [viewportWidth, offsetChar]
  );

  useEffect(
    function () {
      if (rows.length) {
        setVertical(computeVertical(rows, lineHeight));
      }
    },
    [rows, lineHeight]
  );

  useEffect(
    function () {
      if (horizontal) {
        const { max } = horizontal;
        const nr = computeRows(value, max);
        setRows(nr);

        if (onCompute) {
          onCompute(nr);
        }
      }
    },
    [horizontal, value, onCompute]
  );

  return (
    <div className="react-large-text">
      <LargeScrollableContainer
        id={id}
        vertical={vertical}
        horizontal={horizontal}
        onResize={onResize}
        treeSize
      >
        <ContentText rows={rows} />
      </LargeScrollableContainer>
    </div>
  );
}

export default ({ value, lineHeight, onCompute }) => {
  return (
    <OffsetChar>
      <ReactLargeText
        value={value}
        lineHeight={lineHeight}
        onCompute={onCompute}
      />
    </OffsetChar>
  );
};
