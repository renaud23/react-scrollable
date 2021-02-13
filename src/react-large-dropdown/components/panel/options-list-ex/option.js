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
  onMouseEnter,
  children,
}) {
  function onClick(e) {
    e.stopPropagation();
    e.preventDefault();
    if (!selected) {
      onSelect(item, index);
    }
  }
  function onMouseEnterCallback() {
    onMouseEnter(index);
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
      onMouseEnter={onMouseEnterCallback}
      onClick={onClick}
    >
      {children}
    </li>
  );
}

export default Option;
