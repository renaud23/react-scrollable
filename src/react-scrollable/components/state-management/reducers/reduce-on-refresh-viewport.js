import { computeScrollbarSize, computeScrollbarPos } from "../common-reducers";

function resolve(scrollbar, viewportSize) {
  return computeScrollbarPos(computeScrollbarSize(scrollbar, viewportSize));
}

/**
 *
 * @param {*} state
 * @param {*} action
 */
function reduce(state) {
  const { horizontal, vertical, viewportWidth, viewportHeight } = state;
  return {
    ...state,
    horizontal: resolve(horizontal, viewportWidth),
    vertical: resolve(vertical, viewportHeight),
  };
}

export default reduce;
