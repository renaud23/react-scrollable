import {
  resolveFromStart,
  moveStart,
  resolveScrollPixels,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { delta, pixels } = payload;
  const { vertical } = state;
  if (delta !== undefined) {
    const start = moveStart(vertical, delta);
    return { ...state, vertical: resolveFromStart({ ...vertical, start }) };
  }
  if (pixels !== undefined) {
    return {
      ...state,
      vertical: resolveScrollPixels(vertical, pixels),
    };
  }
  return state;
}

export default reduce;
