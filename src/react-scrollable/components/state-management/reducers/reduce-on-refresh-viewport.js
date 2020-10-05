import { computeScrollbarSize, computeScrollbarPos } from "../common-reducers";

function resolve(scrollbar) {
  return computeScrollbarPos(computeScrollbarSize(scrollbar));
}

/**
 *
 * @param {*} state
 * @param {*} action
 */
function reduce(state) {
  const { horizontal, vertical } = state;

  return {
    ...state,
    horizontal: resolve(horizontal),
    vertical: resolve(vertical),
  };
}

export default reduce;
