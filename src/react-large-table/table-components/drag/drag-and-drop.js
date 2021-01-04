import React, { useContext } from "react";
import DragAndDropColumn from "./drag-and-drop-column";
import { TableContext } from "../../state-management";

function DragAndDrop() {
  const [state] = useContext(TableContext);
  const { dragged } = state;
  if (dragged) {
    const { type } = dragged;
    if (type === "drag/column") {
      return <DragAndDropColumn />;
    }
  }

  return null;
}

export default DragAndDrop;
