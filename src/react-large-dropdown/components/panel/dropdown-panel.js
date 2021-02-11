import React, { useContext } from "react";
import OptionsList from "./options-list-ex";
import DropdownPanelContainer from "./dropdown-panel-container";
import { DropdownContext } from "../../state-management";

function DropdownPanel({ itemRenderer, onSelect }) {
  const [state] = useContext(DropdownContext);
  const { focused, expended } = state;

  return (
    <DropdownPanelContainer focused={focused} expended={expended}>
      <OptionsList itemRenderer={itemRenderer} onSelect={onSelect} />
    </DropdownPanelContainer>
  );
}

export default DropdownPanel;
