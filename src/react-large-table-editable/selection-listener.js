import React, { useContext } from "react";
import { EditableContext, actions } from "./state-management";

function onClickDefault() {}

function SelectionListener({
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
          const { clientX, clientY } = e;
          dispatch(
            actions.onStartDrag({ type, column, row, clientX, clientY })
          );
        }
      }}
      onMouseEnter={function (e) {
        if (drag) {
          dispatch(actions.onExpendDrag({ type, column, row }));
        }
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default SelectionListener;
