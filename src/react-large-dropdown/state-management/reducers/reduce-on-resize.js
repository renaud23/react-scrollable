import { resolveVertical } from "./commons-reducer";

function reduce(state, action) {
  const { payload } = action;
  const { width, height } = payload;
  const { vertical, horizontal, optionsHeight } = state;

  return {
    ...state,
    vertical: resolveVertical(
      { ...vertical, size: height },
      undefined,
      optionsHeight
    ),
    horizontal: { ...horizontal, size: width },
  };
}

export default reduce;
