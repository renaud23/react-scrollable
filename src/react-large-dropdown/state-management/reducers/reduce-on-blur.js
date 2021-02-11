function reduce(state) {
  return {
    ...state,
    focused: false,
    expended: false,
    activeIndex: undefined,
    verticalScrollRequest: { percent: 0 },
  };
}

export default reduce;
