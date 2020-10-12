function initializeScrollbar() {
  return {
    maxSize: 0,
    size: undefined,
    cumulsSize: undefined,
    treeSize: undefined,
    start: undefined,
    nb: undefined,
    max: undefined,
    margin: undefined,
    scrollPercent: 0,
    scrollRequest: undefined,
  };
}

const INITIAL_STATE = {
  id: undefined,
  header: [],
  rows: [],
  headerHeight: undefined,
  treeSize: false,

  horizontal: initializeScrollbar(),
  vertical: initializeScrollbar(),
};

export default INITIAL_STATE;
