import { computeTrackPos } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { delta } = payload;
  const { vertical } = state;

  if (delta !== 0) {
    return { ...state, vertical: computeTrackPos(vertical, delta) };
  }

  return state;
}

export default reduce;
