import React, { useContext, useCallback } from "react";
import { safeCss } from "../../../../commons-scrollable";
import { DropdownContext, actions } from "../../../state-management";
import Option from "./option";

function getContent(state, ItemRenderer, onSelect) {
  const {
    vertical,
    optionsHeight,
    horizontal,
    displayedItems,
    selectedIndex,
    search,
  } = state;
  const { margin, maxSize } = horizontal;
  const { nb, start } = vertical;
  if (nb) {
    return new Array(nb).fill(null).map(function (_, i) {
      const index = start + i;
      const item = displayedItems[index];
      const { value } = item;

      return (
        <Option
          key={value}
          item={item}
          index={index}
          height={optionsHeight}
          width={maxSize}
          margin={margin}
          selected={selectedIndex === index}
          onSelect={onSelect}
        >
          <ItemRenderer item={item} index={index} search={search} />
        </Option>
      );
    });
  }
  return [];
}

function OptionListContent(
  { itemRenderer, onKeyDown, onSelect: onSelectUser },
  ref
) {
  const [state, dispatch] = useContext(DropdownContext);
  const { vertical } = state;
  const { margin: marginTop } = vertical;

  const onSelect = useCallback(
    function (item, index) {
      dispatch(actions.onSelect(index));
      onSelectUser(item, index);
    },
    [dispatch, onSelectUser]
  );

  const content = getContent(state, itemRenderer, onSelect);

  function onKeydownCallback(e) {
    e.stopPropagation();
    const { key } = e;
    if (key !== "Tab") {
      e.preventDefault();
    }
    onKeyDown(key);
  }
  return (
    <ul
      role="listbox"
      ref={ref}
      tabIndex="-1"
      onKeyDown={onKeydownCallback}
      style={{
        marginTop: safeCss(marginTop),
      }}
    >
      {content}
    </ul>
  );
}

export default React.forwardRef(OptionListContent);
