import resolveScrollableData from "./refresh-scrollable-data";

function getHeight({ __height }) {
  return __height;
}

function getWidth({ width }) {
  return width;
}

function reduce(state, action) {
  const { payload } = action;
  const { data, headerHeight, treeSize } = payload;

  if (typeof data === "object") {
    const { header, rows } = data;
    const { vertical, horizontal } = state;
    const { rows: rOld, header: hOld } = state;
    return {
      ...state,
      vertical:
        rows !== rOld ? resolveScrollableData(rows, getHeight) : vertical,
      horizontal:
        header !== hOld ? resolveScrollableData(header, getWidth) : horizontal,
      header,
      rows,
      headerHeight,
      treeSize,
    };
  }
  return { ...state, headerHeight, treeSize };
}

export default reduce;
