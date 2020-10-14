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
  start,
  nb,
  margin,
  itemRenderer: ItemRenderer = DefaultItemRenderer,
}) {
  if (nb) {
    const contentLi = new Array(nb).fill(null).map(function (_, i) {
      const item = list[start + i];
      const { __height } = item;
      const height = safeCss(__height);
      return (
        <li key={start + i} style={{ height }}>
          <ItemRenderer item={item} height={height} />
        </li>
      );
    });
    return <ul style={{ marginTop: safeCss(margin) }}>{contentLi}</ul>;
  }
  return <ul></ul>;
}

export default React.memo(ContentList);
