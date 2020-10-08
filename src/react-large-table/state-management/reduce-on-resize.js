function reduce(state, action) {
  const { payload } = action;
  const { width, height } = payload;
  return { ...state, viewportWidth: width, viewportHeight: height };
}

export default reduce;
