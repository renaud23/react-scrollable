import React, { useContext } from "react";
import Dragger from "./dragger";
import { actions, TableContext } from "../../state-management";
import { DRAGGED_ELEMENT } from "../../commons-table";
import DragAnDropColumn from "./drag-and-drop-column";

function getContent(dragged) {
  const { type } = dragged;
  switch (type) {
    case DRAGGED_ELEMENT.column:
      return <DragAnDropColumn dragged={dragged} />;
    case DRAGGED_ELEMENT.row:
    default:
      return null;
  }
}

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
    const content = getContent(dragged);
    if (content) {
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
          {content}
        </Dragger>
      );
    }
    return null;
  }

  return null;
}

export default DragAndDrop;
