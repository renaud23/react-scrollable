function reduce(state) {
  const { dragged } = state;
  return { ...state, dragged: { ...dragged, scrollRequest: undefined } };
}

export default reduce;
