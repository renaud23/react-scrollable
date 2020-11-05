import React, { useContext } from "react";
import { EditableContext, actions } from "./state-management";

function onClickDefault() {}

function Listener({
  children,
  className,
  type,
  column,
  row,
  onClick = onClickDefault,
}) {
  const [state, dispatch] = useContext(EditableContext);
  const { drag } = state;
  return (
    <div
      className={className}
      onMouseDown={function (e) {
        if (e.button === 0) {
          dispatch(actions.onStartDrag({ type, column, row }));
        }
      }}
      onMouseEnter={function (e) {
        if (drag) {
          dispatch(actions.onExpendDrag({ type, column, row }));
        }
      }}
      onMouseUp={function (e) {
        if (e.button === 0) {
          dispatch(actions.onStopDrag());
        }
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Listener;
