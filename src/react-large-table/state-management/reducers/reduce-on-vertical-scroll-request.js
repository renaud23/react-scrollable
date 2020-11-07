function reduce(state, action) {
  const { payload } = action;
  const { delta } = payload;
  const { vertical } = state;

  return { ...state, vertical: { ...vertical, scrollRequest: { delta } } };
}

export default reduce;
