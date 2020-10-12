import { resolveScrollbar } from "./commons-reducer";

function getSize({ __height }) {
  return __height;
}

function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { vertical } = state;

  return {
    ...state,
    vertical: resolveScrollbar(
      { ...vertical, scrollPercent: percent },
      getSize
    ),
  };
}

export default reduce;
