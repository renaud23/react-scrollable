import resolveScrollableData from "./refresh-scrollable-data";
import { getHeight, getWidth, getId } from "../../commons-table";

function reduce(state, action) {
  const { payload } = action;
  const { data, headerHeight, treeSize } = payload;

  if (typeof data === "object") {
    const { header, rows } = data;
    const { vertical, horizontal, id, rows: rOld, header: hOld } = state;
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
      id: getId(id),
    };
  }
  return { ...state, headerHeight, treeSize };
}

export default reduce;
