function initializeScrollbar() {
  return {
    maxSize: 0,
    cumulsSize: undefined,
    treeSize: undefined,
    start: undefined,
    nb: undefined,
    margin: undefined,
    scrollPercent: 0,
  };
}

const INITIAL_STATE = {
  header: [],
  rows: [],
  headerHeight: undefined,

  viewportWidth: undefined,
  viewportHeight: undefined,

  horizontal: initializeScrollbar(),
  // maxWidth: 0,
  // cumulColumnsWidth: undefined,
  // startColumn: undefined,
  // nbColumns: undefined,
  // marginLeft: undefined,
  // horizontalScrollPercent: 0,

  maxHeight: 0,
  cumulRowHeight: undefined,
  startRow: undefined,
  nbRows: undefined,
  marginTop: undefined,
  verticalScrollPercent: 0,
};

export default INITIAL_STATE;
