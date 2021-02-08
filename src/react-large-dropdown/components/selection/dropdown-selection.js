import React, { useContext, useCallback } from "react";
import DropdownSelectionContainer from "./dropdown-selection-container";
import { DropdownContext, actions } from "../../state-management";
import SimpleSelection from "./simple";
import WritableSelection from "./writable";

function getComponent(writable) {
  return writable ? WritableSelection : SimpleSelection;
}

function DropdownSelection() {
  const [state, dispatch] = useContext(DropdownContext);
  const { writable } = state;

  const onFocus = useCallback(
    function () {
      dispatch(actions.onFocus());
    },
    [dispatch]
  );

  const onBlur = useCallback(
    function () {
      dispatch(actions.onBlur());
    },
    [dispatch]
  );

  const Selection = getComponent(writable);

  return (
    <DropdownSelectionContainer>
      <Selection onFocus={onFocus} onBlur={onBlur} />
    </DropdownSelectionContainer>
  );
}

export default DropdownSelection;
