import {
  computeTreeSize,
  resolveFromScrollPercent,
  resolveFromStart,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { rowable, treeSize } = payload;
  const { vertical } = state;
  const { start } = vertical;
  const { cumulsSize } = rowable;

  const next = {
    ...vertical,
    ...rowable,
    treeSize: treeSize ? computeTreeSize(cumulsSize) : undefined,
  };

  if (start === undefined) {
    return { ...state, vertical: resolveFromScrollPercent(next) };
  }

  return { ...state, vertical: resolveFromStart(next) };
}

export default reduce;
