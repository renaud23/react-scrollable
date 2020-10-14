import { computeTreeSize } from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { scrollable, treeSize } = payload;
  const { horizontal } = state;
  const { cumulsSize } = scrollable;
  return {
    ...state,
    horizontal: {
      ...horizontal,
      ...scrollable,
      treeSize: treeSize ? computeTreeSize(cumulsSize) : undefined,
    },
  };
}

export default reduce;
