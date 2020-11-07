function getDelta(delta) {
  return delta !== 0 ? { delta } : undefined;
}

function reduce(state) {
  const { dragOutDirection } = state;

  if (dragOutDirection) {
    const { dx, dy } = dragOutDirection;

    return {
      ...state,
      horizontalScrollRequest: getDelta(dx),
      verticalScrollRequest: getDelta(dy),
    };
  }
  return {
    ...state,
    horizontalScrollRequest: undefined,
    verticalScrollRequest: undefined,
  };
}

export default reduce;
