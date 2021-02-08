import React, { useContext } from "react";
import { DropdownContext } from "../state-management";
import DropdownContainer from "./dropdown-container";
import DropdownSelection from "./selection";
import DropdownPanel from "./panel";
import "./react-large-dropdown.scss";

function Dropdown({ className }) {
  const [state] = useContext(DropdownContext);
  const { focused } = state;
  return (
    <DropdownContainer className={className} focused={focused}>
      <DropdownSelection />
      <DropdownPanel />
    </DropdownContainer>
  );
}

export default Dropdown;
