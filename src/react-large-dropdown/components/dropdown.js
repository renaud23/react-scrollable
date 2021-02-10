import React, { useContext, useCallback } from "react";
import { DropdownContext, actions } from "../state-management";
import DropdownContainer from "./dropdown-container";
import DropdownSelection from "./selection";
import DropdownPanel from "./panel";
import "./react-large-dropdown.scss";

function Dropdown({ className, itemRenderer }) {
  const [state, dispatch] = useContext(DropdownContext);
  const { focused } = state;

  const onBlur = useCallback(
    function () {
      dispatch(actions.onBlur());
    },
    [dispatch]
  );

  const onFocus = useCallback(
    function () {
      dispatch(actions.onFocus());
    },
    [dispatch]
  );

  const onKeyDown = useCallback(
    function (key) {
      dispatch(actions.onKeyDown(key));
    },
    [dispatch]
  );
  return (
    <DropdownContainer className={className} focused={focused} onBlur={onBlur}>
      <DropdownSelection
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
      />
      <DropdownPanel itemRenderer={itemRenderer} />
    </DropdownContainer>
  );
}

export default Dropdown;
