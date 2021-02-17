import { resolveScrollRequest } from "./commons-reducer";

function reduce(state) {
  const { vertical, optionsHeight, selectedIndex } = state;
  const verticalScrollRequest = resolveScrollRequest(
    selectedIndex,
    vertical,
    optionsHeight
  );

  return { ...state, verticalScrollRequest };
}

export default reduce;
