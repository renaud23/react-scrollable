import { computeCumulsSize } from "../../../commons-scrollable";

function getHeight({ __height }) {
  return __height;
}

function getWidth({ width }) {
  return width;
}

function computeVertical(rows = []) {
  const cumulsSize = computeCumulsSize(rows, getHeight);
  const max = rows.length;
  const maxSize = cumulsSize[max];
  return { max, maxSize, cumulsSize };
}

function computeHorizontal(header = []) {
  const cumulsSize = computeCumulsSize(header, getWidth);
  const max = header.length;
  const maxSize = cumulsSize[max];
  return { max, maxSize, cumulsSize };
}

function reduce(state, action) {
  const { payload } = action;
  const { data, headerHeight, treeSize } = payload;
  if (typeof data === "object") {
    const { header, rows, vertical, horizontal } = data;
    const { rows: rOld, header: hOld } = state;
    return {
      ...state,
      vertical: rows !== rOld ? computeVertical(rows) : vertical,
      horizontal: header !== hOld ? computeHorizontal(header) : horizontal,
      header,
      rows,
      headerHeight,
      treeSize,
    };
  }
  return { ...state, headerHeight, treeSize };
}

export default reduce;
