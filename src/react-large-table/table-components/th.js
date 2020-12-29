import React, { useCallback, useContext } from "react";
import classnames from "classnames";
import { actions } from "../state-management";
import { Track, safeCss } from "../../commons-scrollable";
import { TableContext } from "../state-management";
import { useKeepDomEntities } from "../state-management";

function Th({ children, width, height, index }) {
  const [state, dispatch] = useContext(TableContext);
  const { header } = state;
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
      {resizable ? <Track onTrack={onTrackCallback} vertical right /> : null}
      {children}
    </th>
  );
}

export default React.memo(Th);
