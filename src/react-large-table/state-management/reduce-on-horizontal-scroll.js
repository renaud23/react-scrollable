import { resolveScrollbar } from "./commons-reducer";

function getSize({ width }) {
  return width;
}

function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  const { horizontal } = state;

  return {
    ...state,
    horizontal: resolveScrollbar(
      { ...horizontal, scrollPercent: percent },
      getSize
    ),
  };
}
export default reduce;
