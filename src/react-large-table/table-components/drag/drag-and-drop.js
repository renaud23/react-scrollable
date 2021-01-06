import React, { useContext } from "react";
import Dragger from "./dragger"; // , { PORTAL_NAMES, isInBoundingRect }
import { actions, TableContext } from "../../state-management";

function DragAndDrop() {
  const [state, dispatch] = useContext(TableContext);
  const { dragged } = state;

  function onClose(e) {
    const { clientX, clientY } = e;
    dispatch(actions.onStopDrag({ clientX, clientY }));
  }

  function onDrag(e) {
    const { clientX, clientY } = e;
    dispatch(actions.onDrag({ x: clientX, y: clientY }));
  }

  function onEnterPortal() {}

  function onExitPortal() {}

  if (dragged) {
    const { clientX, clientY, initial, parent } = dragged;
    const { el, data } = initial;
    const { label } = data;
    return (
      <Dragger
        clientX={clientX}
        clientY={clientY}
        node={el}
        parent={parent}
        onClose={onClose}
        onDrag={onDrag}
        onEnterPortal={onEnterPortal}
        onExitPortal={onExitPortal}
      >
        <span className="th-dragger">{label}</span>
      </Dragger>
    );
  }

  return null;
}

export default DragAndDrop;
