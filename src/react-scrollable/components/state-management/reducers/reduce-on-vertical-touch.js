import { resolveScrollbarMove } from "../common-reducers";

function reduce(state, action) {
  const { vertical } = state;
  const { payload } = action;
  const { delta } = payload;
  return {
    ...state,
    refresh: true,
    vertical: resolveScrollbarMove(vertical, delta, Math.abs(delta)),
  };
}

export default reduce;
