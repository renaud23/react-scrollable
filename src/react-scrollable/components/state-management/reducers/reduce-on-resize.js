function resolve(scrollbar, size) {
  return { ...scrollbar, size };
}

function reduce(state, action) {
  const { payload } = action;
  const { width, height } = payload;
  const { horizontal, vertical } = state;
  return {
    ...state,
    horizontal: resolve(horizontal, width),
    vertical: resolve(vertical, height),
  };
}

export default reduce;
