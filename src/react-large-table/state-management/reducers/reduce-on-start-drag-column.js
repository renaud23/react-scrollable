function reduce(state, action) {
  const { payload } = action;

  return { ...state, draggedColumn: payload };
}

export default reduce;
