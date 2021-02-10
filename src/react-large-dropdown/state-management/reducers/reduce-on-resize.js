import { resolveVertical } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { width, height } = payload;
  const { vertical, horizontal } = state;

  return {
    ...state,
    vertical: resolveVertical({ ...vertical, size: height }),
    horizontal: { ...horizontal, size: width },
  };
}

export default reduce;
