function updateOne(scrollbar, max) {
  const { max: current } = scrollbar;
  if (current !== max) {
    return { ...scrollbar, max };
  }
  return scrollbar;
}

function reduce(state, action) {
  const { payload } = action;
  const { maxWidth, maxHeight, focused } = payload;
  const { horizontal, vertical } = state;

  return {
    ...state,
    focused,
    horizontal: updateOne(horizontal, maxWidth),
    vertical: updateOne(vertical, maxHeight),
  };
}

export default reduce;
