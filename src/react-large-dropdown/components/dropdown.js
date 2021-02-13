import React, { useContext, useCallback } from "react";
import { DropdownContext, actions } from "../state-management";
import DropdownContainer from "./dropdown-container";
import DropdownSelection from "./selection";
import DropdownPanel from "./panel";
import "./react-large-dropdown.scss";

function Dropdown({ className, itemRenderer, onSelect, searching }) {
  const [state, dispatch] = useContext(DropdownContext);
  const { focused, labelledBy, id } = state;

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
    <DropdownContainer
      id={id}
      labelledBy={labelledBy}
      className={className}
      focused={focused}
      onBlur={onBlur}
    >
      <DropdownSelection
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        searching={searching}
      />
      <DropdownPanel
        itemRenderer={itemRenderer}
        onSelect={onSelect}
        onKeyDown={onKeyDown}
      />
    </DropdownContainer>
  );
}

export default Dropdown;
