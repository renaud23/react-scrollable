function reduce(state) {
  return { ...state, focused: true, expended: false };
}

export default reduce;
