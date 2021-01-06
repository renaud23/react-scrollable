import React, { useContext } from "react";
import Dragger from "./dragger";
import { actions, TableContext } from "../../state-management";
import DragAnDropColumn from "./drag-and-drop-column";

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

  function onEnterPortal(direction) {
    dispatch(actions.onDragEnterPortal(direction));
  }

  function onExitPortal() {
    dispatch(actions.onDragExitPortal());
  }

  if (dragged) {
    const { clientX, clientY, initial, parent } = dragged;
    const { el } = initial;
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
        <DragAnDropColumn dragged={dragged} />
      </Dragger>
    );
  }

  return null;
}

export default DragAndDrop;
