import { resolveScrollRequest } from "./commons-reducer";

function getIndex(active, selected) {
  if (selected !== undefined) {
    return selected;
  }
  if (active !== undefined) {
    return active;
  }
}

function reduce(state) {
  const { vertical, optionsHeight, activeIndex, selectedIndex } = state;
  const index = getIndex(activeIndex, selectedIndex);
  const verticalScrollRequest = resolveScrollRequest(
    index,
    vertical,
    optionsHeight
  );

  return { ...state, verticalScrollRequest };
}

export default reduce;
