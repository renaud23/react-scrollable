import React, { useCallback, useContext } from "react";
import { actions } from "../state-management";
import { Track, safeCss } from "../../commons-scrollable";
import { TableContext } from "../state-management";

function Th({ children, width, height, index }) {
  const [state, dispatch] = useContext(TableContext);
  const { header } = state;
  const column = header[index];
  const { resizable = false } = column;

  const onTrackCallback = useCallback(
    function (delta) {
      dispatch(actions.onResizeColumn(index, delta));
    },
    [dispatch, index]
  );

  return (
    <th
      className="react-large-table-th"
      style={{
        width: safeCss(width),
      }}
    >
      {resizable ? <Track onTrack={onTrackCallback} vertical right /> : null}
      {children}
    </th>
  );
}

export default React.memo(Th);
