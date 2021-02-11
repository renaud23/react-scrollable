import { resolveVertical } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { optionsHeight, vertical } = state;
  return {
    ...state,
    vertical: resolveVertical(vertical, percent, optionsHeight),
  };
}

export default reduce;
