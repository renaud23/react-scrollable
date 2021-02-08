import React from "react";
import classnames from "classnames";
import { safeCss } from "../commons-scrollable";
import DefaultItemRenderer from "./default-item-renderer";

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
  itemRenderer: ItemRenderer,
  className,
  focused,
}) {
  if (verticalNb) {
    const contentLi = new Array(verticalNb).fill(null).map(function (_, i) {
      const index = verticalStart + i;
      const item = list[index];
      const { __height, __width } = item;
      const height = safeCss(__height);
      return (
        <li key={index} style={{ height }}>
          <ItemRenderer item={item} height={height} width={__width} />
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
  return <ul id={id} className={classnames(className, { focused })}></ul>;
}

ContentList.defaultProps = { itemRenderer: DefaultItemRenderer };

export default React.memo(ContentList);
