function reduce(state, action) {
  const { payload } = action;
  const { percent } = payload;
  return { ...state, verticalScrollPercent: percent };
}

export default reduce;
