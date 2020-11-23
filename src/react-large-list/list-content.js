import React, { useEffect } from "react";
import classnames from "classnames";
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
  className,
  focused,
  onFocus,
  onBlur,
}) {
  useEffect(
    function () {
      if (focused) {
        onFocus();
      } else {
        onBlur();
      }
    },
    [focused, onBlur, onFocus]
  );
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
  return <ul id={id} className={classnames(className)}></ul>;
}

export default React.memo(ContentList);
