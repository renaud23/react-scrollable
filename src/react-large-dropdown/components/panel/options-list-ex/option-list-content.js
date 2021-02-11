import React, { useContext, useCallback } from "react";
import { safeCss } from "../../../../commons-scrollable";
import { DropdownContext, actions } from "../../../state-management";
import Option from "./option";

function getContent(state, ItemRenderer, onSelect, onMouseEnter) {
  const {
    vertical,
    optionsHeight,
    horizontal,
    displayedItems,
    activeIndex,
    selectedIndex,
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
          active={activeIndex === index}
          height={optionsHeight}
          width={maxSize}
          margin={margin}
          selected={selectedIndex === index}
          onSelect={onSelect}
          onMouseEnter={onMouseEnter}
        >
          <ItemRenderer item={item} index={index} />
        </Option>
      );
    });
  }
  return [];
}

function OptionListContent({ itemRenderer, onSelect: onSelectUser }, ref) {
  const [state, dispatch] = useContext(DropdownContext);
  const { vertical } = state;
  const { margin: marginTop } = vertical;

  const onMouseEnter = useCallback(
    function (index) {
      dispatch(actions.onMouseEnterOption(index));
    },
    [dispatch]
  );

  const onSelect = useCallback(
    function (item, index) {
      dispatch(actions.onSelect(index));
      onSelectUser(item, index);
    },
    [dispatch, onSelectUser]
  );

  const content = getContent(state, itemRenderer, onSelect, onMouseEnter);

  return (
    <ul
      role="listbox"
      ref={ref}
      tabIndex="-1"
      onKeyDown={() => null}
      style={{
        marginTop: safeCss(marginTop),
      }}
    >
      {content}
    </ul>
  );
}

export default React.forwardRef(OptionListContent);
