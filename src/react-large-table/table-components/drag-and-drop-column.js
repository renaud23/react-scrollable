import React, { useContext, useCallback, useEffect, useState } from "react";
import { actions } from "../state-management";
import { PORTAL_NAMES, Dragger, isInBoundingRect } from "./drag";
import { RowableContext } from "../../react-rowable/state-management";
import { TableContext } from "../state-management";
import { useDomEntities } from "../state-management";

function Task({ delay = 25, activate }) {
  useEffect(
    function () {
      let timer;
      function timing(step) {
        timer = window.setTimeout(function () {
          activate(step);
          timing(step + 1);
        }, delay);
      }
      timing(1);
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
    function (refresh, { clientX, clientY }) {
      if (refresh && draggedColumn) {
        const { index } = draggedColumn;
        const onWitch = Object.entries(head).reduce(function (a, [i, e]) {
          const rect = e.getBoundingClientRect();
          if (isInBoundingRect(clientX, clientY, rect)) {
            if (parseInt(i) !== index) {
              const { left, width } = rect;
              if (clientX > left && clientX <= left + width) {
                return parseInt(i);
              }
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
    function (step) {
      const { pixels } = scrollRequest;
      dispatch(
        actions.onHorizontalScrollRequest({
          pixels: Math.min(pixels * step, 100),
        })
      );
    },
    [scrollRequest, dispatch]
  );

  const onEnterPortal = function (direction) {
    if (direction === PORTAL_NAMES.left) {
      setScrollRequest({ pixels: -2 });
    } else if (direction === PORTAL_NAMES.right) {
      setScrollRequest({ pixels: 2 });
    }
  };

  const onExitPortal = function () {
    setScrollRequest(undefined);
  };

  const onDragColumn = useCallback(
    function ({ clientX, clientY }) {
      const target = Object.entries(head).reduce(function (curr, [id, el]) {
        const { index } = draggedColumn;
        const rect = el.getBoundingClientRect();
        if (
          isInBoundingRect(clientX, clientY, rect) &&
          index !== Number.parseInt(id)
        ) {
          const { left, width } = rect;
          const position = clientX < left + width / 2 ? "left" : "right";
          return { index: Number.parseInt(id), position };
        }
        return curr;
      }, undefined);
      dispatch(actions.onDragColumn(target));
    },
    [head, draggedColumn, dispatch]
  );

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
          onDrag={onDragColumn}
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
