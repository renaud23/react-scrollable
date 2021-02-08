function reduce(state, action) {
  const { payload } = action;
  const { list, disabled, writable } = payload;
  return { ...state, list, disabled, writable, displayedItems: list };
}

export default reduce;
