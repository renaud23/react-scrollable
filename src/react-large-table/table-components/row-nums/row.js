import React, { useCallback } from "react";
import classnames from "classnames";
import { TableContext, actions } from "../../state-management";
import { safeCss, Track } from "../../../commons-scrollable";
import { useDispatch } from "../../commons-table";

function Row({ height, index, rowNumRenderer: RowNum }) {
  const dispatch = useDispatch(TableContext);

  const onTrackCallback = useCallback(
    function (delta) {
      dispatch(actions.onResizeRow(index, delta));
    },
    [dispatch, index]
  );

  const onClick = useCallback(
    function (e) {
      e.stopPropagation();
      dispatch(actions.onClickRowNum(index));
    },
    [dispatch, index]
  );

  return (
    <div
      style={{ height: safeCss(height) }}
      onClick={onClick}
      className={classnames("row-container", {
        odd: index % 2 === 1,
      })}
    >
      <Track onTrack={onTrackCallback} horizontal bottom />
      <RowNum index={index} />
    </div>
  );
}

export default Row;
