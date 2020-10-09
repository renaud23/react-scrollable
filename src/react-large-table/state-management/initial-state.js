const INITIAL_STATE = {
  header: [],
  rows: [],
  headerHeight: undefined,

  viewportWidth: undefined,
  viewportHeight: undefined,

  maxWidth: 0,
  cumulColumnsWidth: undefined,
  startColumn: undefined,
  nbColumns: undefined,
  marginLeft: undefined,

  maxHeight: 0,
  cumulRowHeight: undefined,
  startRow: undefined,
  nbRows: undefined,
  marginTop: undefined,

  verticalScrollPercent: 0,
  horizontalScrollPercent: 0,
};

export default INITIAL_STATE;
