import { resolveFromScrollPercent } from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { vertical } = state;

  return {
    ...state,
    vertical: resolveFromScrollPercent({ ...vertical, scrollPercent: percent }),
  };
}

export default reduce;
