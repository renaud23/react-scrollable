import refreshScrollableData from "./refresh-scrollable-data";
import { getHeight, getWidth, getId } from "../../commons-table";

function reduce(state, action) {
  const { payload } = action;
  const { data, headerHeight, treeSize, rowHeight } = payload;

  if (typeof data === "object") {
    const { header, rows } = data;
    const { vertical, horizontal, id, rows: rOld, header: hOld } = state;
    return {
      ...state,
      vertical:
        rows !== rOld
          ? {
              ...refreshScrollableData(rows, getHeight, rowHeight),
              fixed: rowHeight !== undefined,
              fixedValue: rowHeight,
            }
          : vertical,
      horizontal:
        header !== hOld ? refreshScrollableData(header, getWidth) : horizontal,
      header,
      rows,
      rowHeight,
      headerHeight,
      treeSize,
      id: getId(id),
    };
  }
  return { ...state, headerHeight, rowHeight, treeSize };
}

export default reduce;
