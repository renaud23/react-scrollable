function append(id, type, entity, domEntities) {
  const sub = domEntities[type] || {};
  return { ...domEntities, [type]: { ...sub, [id]: entity } };
}

function reduce(state, action) {
  const { payload } = action;
  const { id, type, entity } = payload;
  const { domEntities } = state;

  if (id !== undefined) {
    return { ...state, domEntities: append(id, type, entity, domEntities) };
  }

  return state;
}

export default reduce;
