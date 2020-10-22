import React, { useCallback } from "react";
import { safeCss, Track } from "../../commons-scrollable";
import { TableContext, actions } from "../state-management";
import { useDispatch } from "../commons-table";

function Td({ children, width, row, first }) {
  const dispatch = useDispatch(TableContext);
  const onTrackCallback = useCallback(
    function (delta) {
      dispatch(actions.onResizeRow(row, delta));
    },
    [dispatch, row]
  );
  return (
    <td style={{ width: safeCss(width) }} className="react-large-table-td">
      {children}
      {first ? <Track onTrack={onTrackCallback} horizontal bottom /> : null}
    </td>
  );
}

export default React.memo(Td);
