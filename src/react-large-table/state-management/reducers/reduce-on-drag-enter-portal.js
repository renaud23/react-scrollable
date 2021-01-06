import { PORTAL_NAMES } from "../../commons-table";

function reduceOnDragColumn(state, action) {
  const { dragged } = state;
  const { payload } = action;
  const { direction } = payload;
  if (direction === PORTAL_NAMES.left) {
    return { ...state, dragged: { ...dragged, scrollRequest: { pixels: -2 } } };
  } else if (direction === PORTAL_NAMES.right) {
    return { ...state, dragged: { ...dragged, scrollRequest: { pixels: 2 } } };
  }
  return { ...state, dragged: { ...dragged, scrollRequest: undefined } };
}

function reduce(state, action) {
  const { dragged } = state;
  const { type } = dragged;
  switch (type) {
    case "drag/column":
      return reduceOnDragColumn(state, action);

    default:
      return state;
  }
}

export default reduce;
