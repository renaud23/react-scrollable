let __TABLE_INDEX__ = 1;

function getId(id) {
  return id ? id : `react-large-table-${__TABLE_INDEX__++}`;
}

function reduce(state, action) {
  const { payload } = action;
  const { id } = state;
  const {
    headerHeight = 20,
    rows = [],
    header = [],
    treeSize = false,
  } = payload;

  return {
    ...state,
    headerHeight,
    rows,
    header,
    treeSize,
    id: getId(id),
  };
}

export default reduce;
