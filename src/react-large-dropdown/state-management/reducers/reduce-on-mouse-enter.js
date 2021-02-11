function reduce(state, action) {
  const { payload } = action;
  const { index: activeIndex } = payload;
  return { ...state, activeIndex };
}

export default reduce;
