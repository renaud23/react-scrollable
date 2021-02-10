import React, { useContext } from "react";
import OptionsList from "../../options-list-ex";
import DropdownPanelContainer from "./dropdown-panel-container";
import { DropdownContext } from "../../state-management";

function DropdownPanel({ itemRenderer }) {
  const [state] = useContext(DropdownContext);
  const { focused } = state;

  return (
    <DropdownPanelContainer focused={focused}>
      <OptionsList itemRenderer={itemRenderer} />
    </DropdownPanelContainer>
  );
}

export default DropdownPanel;
