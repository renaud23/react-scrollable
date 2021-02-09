import {
  resolveFromStart,
  moveStart,
  moveStartTo,
  resolveScrollPixels,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { delta, pixels, index } = payload;
  const { horizontal } = state;

  if (typeof index === "number" && index >= 0) {
    const start = moveStartTo(horizontal, index);
    return { ...state, horizontal: resolveFromStart({ ...horizontal, start }) };
  }
  if (delta !== undefined) {
    const start = moveStart(horizontal, delta);
    return { ...state, horizontal: resolveFromStart({ ...horizontal, start }) };
  }
  if (pixels !== undefined) {
    return {
      ...state,
      horizontal: resolveScrollPixels(horizontal, pixels),
    };
  }
  return state;
}

export default reduce;
