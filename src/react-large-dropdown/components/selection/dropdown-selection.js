import React, { useContext, useCallback } from "react";
import DropdownSelectionContainer from "./dropdown-selection-container";
import { DropdownContext, actions } from "../../state-management";
import SimpleSelection from "./simple";
import WritableSelection from "./writable";

function getComponent(writable) {
  return writable ? WritableSelection : SimpleSelection;
}

function DropdownSelection({ onFocus, onBlur, onKeyDown }) {
  const [state, dispatch] = useContext(DropdownContext);
  const { writable } = state;

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
      />
    </DropdownSelectionContainer>
  );
}

export default DropdownSelection;
