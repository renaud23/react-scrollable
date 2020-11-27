function updateOne(scrollbar, max) {
  const { max: current } = scrollbar;
  if (current !== max) {
    return { ...scrollbar, max };
  }
  return scrollbar;
}

function reduce(state, action) {
  const { payload } = action;
  const { maxWidth, maxHeight } = payload;
  const { horizontal, vertical } = state;

  return {
    ...state,
    horizontal: updateOne(horizontal, maxWidth),
    vertical: updateOne(vertical, maxHeight),
  };
}

export default reduce;
