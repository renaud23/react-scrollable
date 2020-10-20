import React, { useCallback, useContext } from "react";
import classnames from "classnames";
import { TableContext, actions } from "../../state-management";
import { safeCss, Track } from "../../../commons-scrollable";

function Row({ height, index }) {
  const dispatch = useContext(TableContext)[1];

  const onTrackCallback = useCallback(
    function (delta) {
      dispatch(actions.onResizeRow(index, delta));
    },
    [dispatch, index]
  );

  return (
    <div
      style={{ height: safeCss(height) }}
      className={classnames("row-container", {
        odd: index % 2 === 1,
      })}
    >
      <Track onTrack={onTrackCallback} horizontal bottom />
      <div className="row">{index + 1}</div>
    </div>
  );
}

export default Row;
