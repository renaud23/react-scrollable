import {
  computeTreeSize,
  resolveFromScrollPercent,
  resolveFromStart,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { rowable, treeSize } = payload;
  const { horizontal } = state;
  const { start } = horizontal;
  const { cumulsSize } = rowable;

  const next = {
    ...horizontal,
    ...rowable,
    treeSize: treeSize ? computeTreeSize(cumulsSize) : undefined,
  };

  if (start === undefined) {
    return { ...state, horizontal: resolveFromScrollPercent(next) };
  }
  return {
    ...state,
    horizontal: resolveFromStart(next),
  };
}

export default reduce;
