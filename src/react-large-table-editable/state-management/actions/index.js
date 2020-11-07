export const ON_UPDATE_DATA = "editable-table/on-update-large-table-editable";
export const onUpdateData = (data) => ({
  type: ON_UPDATE_DATA,
  payload: { data },
});

// export const ON_SELECT_ROW = "editable-table/on-select-row";
// export const onSelectRow = (index) => ({
//   type: ON_SELECT_ROW,
//   payload: { index },
// });

// export const ON_SELECT_COLUMN = "editable-table/on-select-column";
// export const onSelectColumn = (index) => ({
//   type: ON_SELECT_COLUMN,
//   payload: { index },
// });

export const ON_RESET_SELECTION = "editable-table/on-reset-selection";
export const onResetSelection = (index) => ({
  type: ON_RESET_SELECTION,
});

export const ON_START_DRAG = "editable-table/on-start-drag";
export const onStartDrag = (args) => ({
  type: ON_START_DRAG,
  payload: { ...args },
});

export const ON_DRAG = "editable-table/on-drag";
export const onDrag = (args) => ({
  type: ON_DRAG,
  payload: { ...args },
});

export const ON_STOP_DRAG = "editable-table/on-stop-drag";
export const onStopDrag = (args) => ({
  type: ON_STOP_DRAG,
  payload: { ...args },
});

export const ON_DRAG_OUT = "editable-table/on-drag-out";
export const onDragOut = (args) => ({
  type: ON_DRAG_OUT,
  payload: { ...args },
});

export const ON_MOUSE_LEAVE = "editable-table/on-mouse-leave";
export const onMouseLeave = (dragOutTask) => ({
  type: ON_MOUSE_LEAVE,
  payload: { dragOutTask },
});

export const ON_MOUSE_ENTER = "editable-table/on-mouse-enter";
export const onMouseEnter = () => ({ type: ON_MOUSE_ENTER });

export const ON_DRAG_OUT_TASK_PULSE = "editable-table/on-drag-out-task_pulse";
export const onDragOutTaskPulse = () => ({ type: ON_DRAG_OUT_TASK_PULSE });
