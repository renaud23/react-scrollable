import React, { useCallback, useContext, useState } from "react";
import classnames from "classnames";
import Dragger from "./dragger";
import { actions } from "../state-management";
import { Track, safeCss } from "../../commons-scrollable";
import { RowableContext } from "../../react-rowable/state-management";
import { TableContext } from "../state-management";
import { useKeepDomEntities, useDomEntities } from "../state-management";

function Th({ children, width, height, index }) {
  const [state, dispatch] = useContext(TableContext);
  const rowableContainer = useContext(RowableContext)[2];
  const [drag, setDrag] = useState(false);
  const [dragger, setDragger] = useState({});
  const { header } = state;
  const column = header[index];
  const { resizable = false, label } = column;
  const head = useDomEntities("th");
  const thEl = useKeepDomEntities(index, "th");
  const onTrackCallback = useCallback(
    function (delta) {
      dispatch(actions.onResizeColumn(index, delta));
    },
    [dispatch, index]
  );

  const onMouseDown = function (e) {
    if (e.button === 0) {
      const { clientX, clientY } = e;
      setDragger({
        clientX,
        clientY,
        node: e.target,
        parent: rowableContainer.current,
        onClose,
      });

      setDrag(true);
    }
  };

  const onClose = useCallback(
    function (refresh, { clientX }) {
      if (refresh) {
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

      setDrag(false);
    },
    [head, index, dispatch]
  );

  return (
    <th
      className={classnames("react-large-table-th", { drag })}
      style={{
        width: safeCss(width),
      }}
      onMouseDown={onMouseDown}
      ref={thEl}
    >
      {drag ? (
        <Dragger
          {...dragger}
          onClose={onClose}
          onEnterPortal={(witch) => console.log(witch)}
          onExitPortal={() => console.log("exit")}
        >
          <span className="th-dragger">{label}</span>
        </Dragger>
      ) : null}
      {resizable ? <Track onTrack={onTrackCallback} vertical right /> : null}
      {children}
    </th>
  );
}

export default React.memo(Th);
