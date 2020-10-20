let __ID_INDEX__ = 1;

function getId(id) {
  return id || `react-large-table-${__ID_INDEX__++}`;
}

export default getId;
