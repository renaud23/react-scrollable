import React, { useContext, useCallback, useEffect, useState } from "react";
import { actions } from "../state-management";
import Dragger, { PORTAL_NAMES } from "./dragger";
import { RowableContext } from "../../react-rowable/state-management";
import { TableContext } from "../state-management";
import { useDomEntities } from "../state-management";

function Task({ delay = 250, activate }) {
  useEffect(
    function () {
      let timer;
      function timing() {
        timer = window.setTimeout(function () {
          activate();
          timing();
        }, delay);
      }
      timing();
      return function () {
        window.clearTimeout(timer);
      };
    },
    [delay, activate]
  );

  return null;
}

function DragAndDropColumn() {
  const [scrollRequest, setScrollRequest] = useState(undefined);
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

  const activate = useCallback(
    function () {
      dispatch(actions.onHorizontalScrollRequest({ ...scrollRequest }));
    },
    [scrollRequest, dispatch]
  );

  const onEnterPortal = function (direction) {
    if (direction === PORTAL_NAMES.left) {
      setScrollRequest({ delta: -1 });
    } else if (direction === PORTAL_NAMES.right) {
      setScrollRequest({ delta: 1 });
    }
  };

  const onExitPortal = function () {
    setScrollRequest(undefined);
  };

  if (draggedColumn !== undefined) {
    const { clientX, clientY, label, node } = draggedColumn;

    return (
      <>
        {scrollRequest ? <Task activate={activate} /> : null}
        <Dragger
          clientX={clientX}
          clientY={clientY}
          node={node}
          parent={parent}
          onClose={onClose}
          onEnterPortal={onEnterPortal}
          onExitPortal={onExitPortal}
        >
          <span className="th-dragger">{label}</span>
        </Dragger>
      </>
    );
  }
  return null;
}

export default DragAndDropColumn;
