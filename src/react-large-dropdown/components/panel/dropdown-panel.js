import React, { useContext } from "react";
import ReactLargeList from "../../../react-large-list";
import DropdownPanelContainer from "./dropdown-panel-container";
import { DropdownContext } from "../../state-management";

function DefaultItemRenderer({ item }) {
  const { libelle } = item;
  return <div className="dropdown-item">{libelle}</div>;
}

function DropdownPanel() {
  const [state] = useContext(DropdownContext);
  const { displayedItems, focused } = state;
  if (focused) {
    return (
      <DropdownPanelContainer focused={true}>
        <ReactLargeList
          list={displayedItems}
          itemRenderer={DefaultItemRenderer}
        />
      </DropdownPanelContainer>
    );
  }
  return <DropdownPanelContainer focused={false} />;
}

export default DropdownPanel;
