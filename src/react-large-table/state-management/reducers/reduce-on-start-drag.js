function reduce(state, action) {
  const { payload } = action;

  return { ...state, dragged: payload };
}

export default reduce;
