import React, { useContext, useCallback } from "react";
import DropdownSelectionContainer from "./dropdown-selection-container";
import { DropdownContext, actions } from "../../state-management";
import SimpleSelection from "./simple";
import WritableSelection from "./writable";

function getComponent(writable) {
  return writable ? WritableSelection : SimpleSelection;
}

function getItem(items, index) {
  if (Array.isArray(items) && index < items.length) {
    return items[index];
  }
  return undefined;
}

function DropdownSelection({ onFocus, onBlur, onKeyDown, searching }) {
  const [state, dispatch] = useContext(DropdownContext);
  const { writable, displayedItems, selectedIndex, placeHolder, list } = state;
  const item = getItem(displayedItems, selectedIndex);
  const Selection = getComponent(writable);
  const onClick = useCallback(
    function () {
      dispatch(actions.onClickSelection());
    },
    [dispatch]
  );

  return (
    <DropdownSelectionContainer>
      <Selection
        onFocus={onFocus}
        onClick={onClick}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        searching={searching}
        selection={item}
        placeHolder={placeHolder}
      />
    </DropdownSelectionContainer>
  );
}

export default DropdownSelection;
