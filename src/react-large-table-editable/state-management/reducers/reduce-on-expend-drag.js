function reduce(state, action) {
  const { payload } = action;
  const { type, column, row } = payload;

  return { ...state, extent: { type, column, row } };
}

export default reduce;
