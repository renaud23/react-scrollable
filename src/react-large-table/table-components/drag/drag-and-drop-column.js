import React, { useContext, useCallback, useEffect, useState } from "react";
import { actions, TableContext, useDomEntities } from "../../state-management";
import Dragger, { PORTAL_NAMES, isInBoundingRect } from "./dragger";
import { RowableContext } from "../../../react-rowable/state-management";

function Task({ delay = 25, activate }) {
  useEffect(
    function () {
      let timer;
      function timing(step) {
        timer = window.setTimeout(function () {
          activate(step, delay * step);
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
  const { dragged } = state;

  const onClose = useCallback(
    function (refresh, { clientX, clientY }) {
      if (refresh && dragged) {
        const { index } = dragged;
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

      dispatch(actions.onStopDrag());
    },
    [head, dragged, dispatch]
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
        const { index } = dragged;

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
      dispatch(actions.onDrag(target));
    },
    [head, dragged, dispatch]
  );

  if (dragged !== undefined) {
    const { clientX, clientY, label, node } = dragged;

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

export default React.memo(DragAndDropColumn);
