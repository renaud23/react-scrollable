import React, { useCallback, useContext, useState } from "react";
import classnames from "classnames";
import Dragger from "./dragger";
import { actions } from "../state-management";
import useElementObserver, { getElements } from "./use-element-observer";
import { Track, safeCss } from "../../commons-scrollable";
import { RowableContext } from "../../react-rowable/state-management";
import { TableContext } from "../state-management";

function Th({ children, width, height, index }) {
  const [state, dispatch] = useContext(TableContext);
  const rowableContainer = useContext(RowableContext)[2];
  const [drag, setDrag] = useState(false);
  const [dragger, setDragger] = useState({});
  const { header } = state;
  const column = header[index];
  const { resizable = false, label } = column;
  const [head, setHead] = useState(undefined);

  const ref = useElementObserver(index);

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
      setHead(getElements());
      setDrag(true);
    }
  };

  const onClose = useCallback(
    function (refresh, rect) {
      const { left: draggerLeft } = rect;
      if (refresh) {
        const onWitch = Object.entries(head).reduce(function (a, [i, e]) {
          if (parseInt(i) !== index) {
            const { left, width } = e.getBoundingClientRect();
            if (draggerLeft > left && draggerLeft <= left + width) {
              return parseInt(i);
            }
          }

          return a;
        }, undefined);
        console.log(index, onWitch);
      }

      setDrag(false);
    },
    [head, index]
  );

  return (
    <th
      className={classnames("react-large-table-th", { drag })}
      style={{
        width: safeCss(width),
      }}
      onMouseDown={onMouseDown}
      ref={ref}
    >
      {drag ? (
        <Dragger {...dragger} onClose={onClose}>
          <span className="th-dragger">{label}</span>
        </Dragger>
      ) : null}
      {resizable ? <Track onTrack={onTrackCallback} vertical right /> : null}
      {children}
    </th>
  );
}

export default React.memo(Th);
