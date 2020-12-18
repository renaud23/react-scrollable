function remove(domEntities, id, type) {
  if (type in domEntities) {
    return Object.entries(domEntities[type]).reduce(function (a, [k, e]) {
      if (k !== id) {
        return { ...a, [k]: e };
      }
      return a;
    }, {});
  }
  return domEntities;
}

function reduce(state, action) {
  const { payload } = action;
  const { id, type } = payload;
  const { domEntities } = state;
  if (type in domEntities && id in domEntities[type]) {
    return {
      ...state,
      domEntities: remove(domEntities, id, type),
    };
  }

  return state;
}

export default reduce;
