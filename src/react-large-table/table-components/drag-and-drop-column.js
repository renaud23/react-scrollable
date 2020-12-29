import React, { useContext, useCallback } from "react";
import { actions } from "../state-management";
import Dragger from "./dragger";
import { RowableContext } from "../../react-rowable/state-management";
import { TableContext } from "../state-management";
import { useDomEntities } from "../state-management";

function DragAndDropColumn() {
  const [state, dispatch] = useContext(TableContext);
  const { current: parent } = useContext(RowableContext)[2];
  const head = useDomEntities("th");
  const { draggedColumn } = state;

  const onClose = useCallback(
    function (refresh, { clientX }) {
      if (refresh && draggedColumn) {
        const { index } = draggedColumn;
        const onWitch = Object.entries(head).reduce(function (a, [i, e]) {
          if (parseInt(i) !== index) {
            const { left, width } = e.getBoundingClientRect();
            if (clientX > left && clientX <= left + width) {
              return parseInt(i);
            }
          }
          return a;
        }, undefined);

        if (onWitch !== undefined) {
          dispatch(actions.onSwitchColumns(index, onWitch));
        }
      }

      dispatch(actions.onStopDragColumn());
    },
    [head, draggedColumn, dispatch]
  );

  if (draggedColumn !== undefined) {
    const { clientX, clientY, label, node } = draggedColumn;

    return (
      <Dragger
        clientX={clientX}
        clientY={clientY}
        node={node}
        parent={parent}
        onClose={onClose}
      >
        <span className="th-dragger">{label}</span>
      </Dragger>
    );
  }
  return null;
}

export default DragAndDropColumn;
