import React, { useCallback } from "react";
import classnames from "classnames";
import { TableContext, actions } from "../../state-management";
import { safeCss } from "../../../commons-scrollable";
import { useDispatch } from "../../commons-table";

function Row({ height, index, rowNumRenderer: RowNum }) {
  const dispatch = useDispatch(TableContext);

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
      <RowNum index={index} />
    </div>
  );
}

export default Row;
