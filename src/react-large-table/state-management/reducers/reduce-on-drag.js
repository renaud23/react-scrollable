function reduce(state, action) {
  const { dragged } = state;
  const { payload } = action;
  const { target } = payload;
  return { ...state, dragged: { ...dragged, target } };
}

export default reduce;
