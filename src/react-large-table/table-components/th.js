import React, { useCallback, useContext } from "react";
import classnames from "classnames";
import { actions } from "../state-management";
import { Track, safeCss } from "../../commons-scrollable";
import { TableContext } from "../state-management";
import { useKeepDomEntities } from "../state-management";

function DraggedOn({ dragged, column }) {
  if (dragged) {
    const { target } = dragged;
    if (target) {
      const { index, position } = target;
      if (index === column) {
        return (
          <div
            className={classnames("drag-column-indicator", {
              right: position === "right",
              left: position === "left",
            })}
          ></div>
        );
      }
    }
  }
  return null;
}

function Th({ children, width, height, index }) {
  const [state, dispatch] = useContext(TableContext);
  const { header, draggedColumn } = state;
  const column = header[index];
  const { resizable = false, label } = column;
  const thEl = useKeepDomEntities(index, "th");
  const onTrackCallback = useCallback(
    function (delta) {
      dispatch(actions.onResizeColumn(index, delta));
    },
    [dispatch, index]
  );

  const onMouseDown = function (e) {
    const { clientX, clientY } = e;
    dispatch(
      actions.onStartDragColumn({
        clientX,
        clientY,
        label,
        index,
        node: e.target,
      })
    );
  };

  return (
    <th
      className={classnames("react-large-table-th")}
      style={{
        width: safeCss(width),
      }}
      onMouseDown={onMouseDown}
      ref={thEl}
    >
      <DraggedOn dragged={draggedColumn} column={index} />
      {resizable ? <Track onTrack={onTrackCallback} vertical right /> : null}
      {children}
    </th>
  );
}

export default React.memo(Th);
