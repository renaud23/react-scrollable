import React, { useContext } from "react";
import classnames from "classnames";
import { safeCss } from "../../commons-scrollable";
import { DropdownContext } from "../state-management";

function getContent(state, ItemRenderer) {
  const {
    vertical,
    optionsHeight,
    horizontal,
    displayedItems,
    activeIndex,
  } = state;
  const { margin } = horizontal;
  const { nb, start } = vertical;
  if (nb) {
    return new Array(nb).fill(null).map(function (_, i) {
      const index = start + i;
      const item = displayedItems[index];
      const { value } = item;
      return (
        <li
          key={value}
          className={classnames("dropdown-list-item", {
            active: activeIndex === index,
          })}
          style={{
            height: safeCss(optionsHeight),
            marginLeft: safeCss(margin),
          }}
        >
          <ItemRenderer item={item} index={index} />
        </li>
      );
    });
  }
  return [];
}

function OptionListContent({ itemRenderer }, ref) {
  const [state] = useContext(DropdownContext);
  const { vertical } = state;
  const { margin: marginTop } = vertical;

  const content = getContent(state, itemRenderer);
  return (
    <ul
      role="listbox"
      ref={ref}
      style={{
        marginTop: safeCss(marginTop),
      }}
    >
      {content}
    </ul>
  );
}

export default React.forwardRef(OptionListContent);
