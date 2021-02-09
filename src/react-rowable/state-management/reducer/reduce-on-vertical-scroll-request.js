import {
  resolveFromStart,
  moveStart,
  moveStartTo,
  resolveScrollPixels,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { delta, pixels, index } = payload;
  const { vertical } = state;

  if (typeof index === "number" && index >= 0) {
    const start = moveStartTo(vertical, index);
    return { ...state, vertical: resolveFromStart({ ...vertical, start }) };
  }
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
