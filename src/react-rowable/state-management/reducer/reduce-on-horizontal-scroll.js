import { resolveFromScrollPercent } from "./commons-reducers";

function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { horizontal } = state;
  return {
    ...state,
    horizontal: resolveFromScrollPercent({
      ...horizontal,
      scrollPercent: percent,
    }),
  };
}

export default reduce;
