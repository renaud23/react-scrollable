function reduce(state, action) {
  const { payload } = action;
  const { index: selectedIndex } = payload;
  return { ...state, selectedIndex };
}

export default reduce;
