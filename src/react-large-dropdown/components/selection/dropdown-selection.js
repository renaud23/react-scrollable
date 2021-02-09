import React, { useContext } from "react";
import DropdownSelectionContainer from "./dropdown-selection-container";
import { DropdownContext } from "../../state-management";
import SimpleSelection from "./simple";
import WritableSelection from "./writable";

function getComponent(writable) {
  return writable ? WritableSelection : SimpleSelection;
}

function DropdownSelection({ onFocus, onBlur, onKeyDown }) {
  const [state] = useContext(DropdownContext);
  const { writable } = state;

  const Selection = getComponent(writable);

  return (
    <DropdownSelectionContainer>
      <Selection onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} />
    </DropdownSelectionContainer>
  );
}

export default DropdownSelection;
