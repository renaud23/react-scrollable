function reduce(state, action) {
  const { payload } = action;
  const { delta } = payload;
  const { horizontal } = state;

  return { ...state, horizontal: { ...horizontal, scrollRequest: { delta } } };
}

export default reduce;
