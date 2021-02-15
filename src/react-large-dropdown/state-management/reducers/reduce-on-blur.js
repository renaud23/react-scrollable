function reduce(state) {
  return {
    ...state,
    focused: false,
    expended: false,
    verticalScrollRequest: { percent: 0 },
  };
}

export default reduce;
