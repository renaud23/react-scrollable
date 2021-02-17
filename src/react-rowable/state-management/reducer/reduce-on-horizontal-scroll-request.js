import {
  resolveFromStart,
  moveStart,
  resolveScrollPixels,
  refreshMargin,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { delta, pixels, margin } = payload;
  const { horizontal } = state;

  if (delta !== undefined) {
    const start = moveStart(horizontal, delta);
    return {
      ...state,
      horizontal: refreshMargin(
        resolveFromStart({ ...horizontal, start }),
        margin
      ),
    };
  }
  if (pixels !== undefined) {
    return {
      ...state,
      horizontal: refreshMargin(
        resolveScrollPixels(horizontal, pixels),
        margin
      ),
    };
  }
  return state;
}

export default reduce;
