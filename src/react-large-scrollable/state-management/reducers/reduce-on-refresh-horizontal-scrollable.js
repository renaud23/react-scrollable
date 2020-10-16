import {
  computeTreeSize,
  resolveFromScrollPercent,
  resolveFromStart,
} from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { scrollable, treeSize } = payload;
  const { horizontal } = state;
  const { start } = horizontal;
  const { cumulsSize } = scrollable;

  const next = {
    ...horizontal,
    ...scrollable,
    treeSize: treeSize ? computeTreeSize(cumulsSize) : undefined,
  };

  if (start === undefined) {
    return { ...state, horizontal: resolveFromScrollPercent(next) };
  }
  console.log("ici");
  return {
    ...state,
    horizontal: resolveFromStart(next),
  };
}

export default reduce;
