import {
  resolveFromStart,
  moveStart,
  resolveScrollPixels,
  refreshMargin,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { delta, pixels, margin } = payload;
  const { vertical } = state;

  if (delta !== undefined) {
    const start = moveStart(vertical, delta);
    return {
      ...state,
      vertical: refreshMargin(resolveFromStart({ ...vertical, start }), margin),
    };
  }
  if (pixels !== undefined) {
    return {
      ...state,
      vertical: refreshMargin(resolveScrollPixels(vertical, pixels), margin),
    };
  }
  return state;
}

export default reduce;
