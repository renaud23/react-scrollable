function reduce(state, action) {
  const { payload } = action;
  const { data } = payload;

  return { ...state, data };
}

export default reduce;
