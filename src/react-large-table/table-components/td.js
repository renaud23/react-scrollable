import React, { useCallback, useContext } from "react";
import { safeCss, Track } from "../../commons-scrollable";
import { TableContext, actions } from "../state-management";

function Td({ children, width, row, first, rowSpan }) {
  const [state, dispatch] = useContext(TableContext);
  const { rows } = state;
  const { resizable } = rows[row];
  const onTrackCallback = useCallback(
    function (delta) {
      dispatch(actions.onResizeRow(row, delta));
    },
    [dispatch, row]
  );
  return (
    <td
      style={{ width: safeCss(width) }}
      className="react-large-table-td"
      rowSpan={rowSpan}
    >
      {children}
      {first && resizable ? (
        <Track onTrack={onTrackCallback} horizontal bottom />
      ) : null}
    </td>
  );
}

export default React.memo(Td);
