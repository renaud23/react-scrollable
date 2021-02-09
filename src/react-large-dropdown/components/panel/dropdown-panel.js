import React, { useContext } from "react";
import ReactLargeList from "../../../react-large-list";
import DropdownPanelContainer from "./dropdown-panel-container";
import { DropdownContext } from "../../state-management";

function DefaultItemRenderer({ item }) {
  const { label } = item;
  return <div className="dropdown-item">{label}</div>;
}

function DropdownPanel() {
  const [state] = useContext(DropdownContext);
  const { displayedItems, verticalScrollRequest, focused } = state;
  if (focused) {
    return (
      <DropdownPanelContainer focused={true}>
        <ReactLargeList
          list={displayedItems}
          itemRenderer={DefaultItemRenderer}
          verticalScrollRequest={verticalScrollRequest}
          tabIndex="-1"
        />
      </DropdownPanelContainer>
    );
  }
  return <DropdownPanelContainer focused={false} />;
}

export default DropdownPanel;
