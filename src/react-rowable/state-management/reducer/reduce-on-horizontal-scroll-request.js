import {
  resolveFromStart,
  moveStart,
  resolveScrollPixels,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { delta, pixels } = payload;
  const { horizontal } = state;
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
