import { computeTreeSize } from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { scrollable, treeSize } = payload;
  const { vertical } = state;
  const { cumulsSize } = scrollable;
  return {
    ...state,
    vertical: {
      ...vertical,
      ...scrollable,
      treeSize: treeSize ? computeTreeSize(cumulsSize) : undefined,
    },
  };
}

export default reduce;
