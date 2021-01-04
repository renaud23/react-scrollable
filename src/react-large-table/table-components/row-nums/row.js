import React, { useCallback } from "react";
import classnames from "classnames";
import { TableContext, actions } from "../../state-management";
import { safeCss } from "../../../commons-scrollable";
import { useDispatch } from "../../commons-table";
import { useKeepDomEntities } from "../../state-management";

function Row({ height, index, rowNumRenderer: RowNum }) {
  const dispatch = useDispatch(TableContext);
  const rowNumsEl = useKeepDomEntities(index, "rowNums");

  const onClick = useCallback(
    function (e) {
      e.stopPropagation();
      dispatch(actions.onClickRowNum(index));
    },
    [dispatch, index]
  );

  const onMouseDown = function (e) {
    // const { clientX, clientY } = e;
    // dispatch(
    //   actions.onMouseDown({
    //     clientX,
    //     clientY,
    //     label,
    //     index,
    //     node: e.target,
    //   })
    // );
  };

  return (
    <div
      style={{ height: safeCss(height) }}
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={classnames("row-container", {
        odd: index % 2 === 1,
      })}
      ref={rowNumsEl}
    >
      <RowNum index={index} />
    </div>
  );
}

export default React.memo(Row);
