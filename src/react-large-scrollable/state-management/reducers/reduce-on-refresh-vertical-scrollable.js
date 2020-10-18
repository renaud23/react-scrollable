import {
  computeTreeSize,
  resolveFromScrollPercent,
  resolveFromStart,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { scrollable, treeSize } = payload;
  const { vertical } = state;
  const { start } = vertical;
  const { cumulsSize } = scrollable;

  const next = {
    ...vertical,
    ...scrollable,
    treeSize: treeSize ? computeTreeSize(cumulsSize) : undefined,
  };

  if (start === undefined) {
    return { ...state, vertical: resolveFromScrollPercent(next) };
  }

  return { ...state, vertical: resolveFromStart(next) };
}

export default reduce;
