import React from "react";
import classnames from "classnames";
import { safeCss } from "../../../../commons-scrollable";

function Option({
  item,
  index,
  active,
  height,
  width,
  margin,
  selected,
  onSelect,
  children,
}) {
  function onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!selected) {
      onSelect(item, index);
    }
  }

  return (
    <li
      className={classnames("dropdown-list-item", {
        active,
        selected,
      })}
      style={{
        height: safeCss(height),
        width: safeCss(width),
        marginLeft: safeCss(margin),
      }}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default Option;
