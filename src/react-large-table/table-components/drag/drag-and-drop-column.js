import React, { useEffect } from "react";
import { useDispatch } from "../../commons-table";
import { actions, TableContext } from "../../state-management";

function DragAndDropColumn({ dragged }) {
  const dispatch = useDispatch(TableContext);
  const { scrollRequest } = dragged || {};

  useEffect(
    function () {
      let timer,
        step = 1;
      if (scrollRequest) {
        const { pixels } = scrollRequest;
        timer = window.setInterval(function () {
          dispatch(
            actions.onHorizontalScrollRequest({
              pixels: Math.min(pixels * step++, 100),
            })
          );
        }, 25);
      }
      return function () {
        if (timer) {
          window.clearInterval(timer);
        }
      };
    },
    [scrollRequest, dispatch]
  );

  if (dragged) {
    const { initial } = dragged;
    const { data } = initial;
    const { label } = data;

    return <span className="th-dragger">{label}</span>;
  }
  return null;
}

export default React.memo(DragAndDropColumn);
