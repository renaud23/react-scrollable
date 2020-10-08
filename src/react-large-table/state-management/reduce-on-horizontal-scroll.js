function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  return { ...state, horizontalScrollPercent: percent };
}

export default reduce;
