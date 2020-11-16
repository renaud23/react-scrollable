import { resolveScrollbarMove } from "../common-reducers";

function reduce(state, action) {
  const { horizontal } = state;
  const { payload } = action;
  const { delta } = payload;
  return {
    ...state,
    refresh: true,
    horizontal: resolveScrollbarMove(horizontal, delta, Math.abs(delta)),
  };
}

export default reduce;
