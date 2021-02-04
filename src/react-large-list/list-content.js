import React from "react";
import classnames from "classnames";
import { safeCss } from "../commons-scrollable";

function getObjectValue(item) {
  const { label, value } = item;
  if (typeof label === "string") {
    return label;
  }
  if (value !== undefined) {
    return value;
  }
  return "";
}

function getValue(item) {
  const type = typeof item;
  switch (type) {
    case "number":
    case "boolean":
    case "string":
      return item;
    case "object":
      return getObjectValue(item);
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
  className,
  focused,
  onClick,
  onKeyDown,
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
        className={classnames(className, { focused })}
        style={{
          marginTop: safeCss(marginTop),
          marginLeft: safeCss(marginLeft - offsetChar * horizontalStart),
        }}
      >
        {contentLi}
      </ul>
    );
  }
  return (
    <div className="react-large-list">
      <ul id={id} className={classnames(className, { focused })}></ul>
    </div>
  );
}

export default React.memo(ContentList);
