function reduce(state, action) {
  const { payload } = action;
  const { start, nb, margin } = payload;
  return { ...state, rowNums: { start, nb, margin } };
}

export default reduce;
