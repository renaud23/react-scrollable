import React, { useCallback, useContext } from "react";
import classnames from "classnames";
import { Track, safeCss } from "../../commons-scrollable";
import { TableContext, actions, useKeepDomEntities } from "../state-management";
import { RowableContext } from "../../react-rowable/state-management";
import { DRAGGED_ELEMENT, POSITION } from "../commons-table";

function DraggedOn({ dragged, index, className }) {
  if (dragged) {
    const { initial, target, type } = dragged;

    if (type === DRAGGED_ELEMENT.column && target) {
      const { index: targetIndex, position } = target;
      const { index: refIndex } = initial;

      if (refIndex !== initial && targetIndex === index) {
        return (
          <div
            className={classnames(className, {
              right: position === POSITION.right,
              left: position === POSITION.left,
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
  const { header, dragged } = state;
  const column = header[index];
  const { resizable = false } = column;
  const { current: parent } = useContext(RowableContext)[2];
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
      actions.onStartDrag({
        clientX,
        clientY,
        type: DRAGGED_ELEMENT.column,
        parent,
        initial: { el: e.target, index, data: header[index] },
        target: undefined,
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
      <DraggedOn
        dragged={dragged}
        index={index}
        className="drag-column-indicator"
      />
      {resizable ? <Track onTrack={onTrackCallback} vertical right /> : null}
      {children}
    </th>
  );
}

export default React.memo(Th);
