import React, { useContext } from "react";
import { safeCss } from "../../commons-scrollable";
import { DropdownContext } from "../state-management";

function getContent(vertical, items, rowHeight, marginLeft, ItemRenderer) {
  const { nb, start } = vertical;
  if (nb) {
    return new Array(nb).fill(null).map(function (_, i) {
      const item = items[start + i];
      const { value } = item;
      return (
        <li
          key={value}
          style={{
            height: safeCss(rowHeight),
            marginLeft: safeCss(marginLeft),
          }}
        >
          <ItemRenderer item={item} index={start + i} />
        </li>
      );
    });
  }
  return [];
}

function OptionListContent({ itemRenderer }, ref) {
  const [state] = useContext(DropdownContext);
  const { displayedItems, vertical, optionsHeight, horizontal } = state;
  const { margin: marginLeft } = horizontal;
  const { margin: marginTop } = vertical;

  const content = getContent(
    vertical,
    displayedItems,
    optionsHeight,
    marginLeft,
    itemRenderer
  );
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
