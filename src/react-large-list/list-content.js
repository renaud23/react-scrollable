import React from "react";
import { safeCss } from "../commons-scrollable";

function getValue(item) {
  const type = typeof item;
  switch (type) {
    case "number":
    case "boolean":
    case "string":
      return item;
    case "object":
      return "value" in item ? item.value : "";
    default:
      return "";
  }
}

function DefaultItemRenderer({ item, height }) {
  const value = getValue(item);
  return (
    <span
      className="default-item-renderer"
      style={{ lineHeight: `${height}px` }}
    >
      {value}
    </span>
  );
}

/* */
function ContentList({
  list,
  id,
  verticalStart,
  marginTop,
  verticalNb,
  horizontalStart,
  marginLeft,
  offsetChar,
  itemRenderer: ItemRenderer = DefaultItemRenderer,
}) {
  if (verticalNb) {
    const contentLi = new Array(verticalNb).fill(null).map(function (_, i) {
      const index = verticalStart + i;
      const item = list[index];
      const { __height } = item;
      const height = safeCss(__height);
      return (
        <li key={index} style={{ height }}>
          <ItemRenderer item={item} height={height} />
        </li>
      );
    });

    return (
      <ul
        id={id}
        style={{
          marginTop: safeCss(marginTop),
          marginLeft: safeCss(marginLeft - offsetChar * horizontalStart),
        }}
      >
        {contentLi}
      </ul>
    );
  }
  return <ul id={id}></ul>;
}

export default React.memo(ContentList);
