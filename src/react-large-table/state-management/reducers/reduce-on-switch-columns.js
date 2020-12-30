import resolveScrollableData from "./refresh-scrollable-data";
import { getWidth } from "../../commons-table";

function reduce(state, action) {
  const { payload } = action;
  const { one, two } = payload;
  const { header, draggedColumn } = state;
  const next = header.reduce(function (curr, column, index) {
    if (index === one) {
      return curr;
    }

    if (index === two) {
      const { target } = draggedColumn;
      const { position } = target;
      if (position === "left") {
        return [...curr, header[one], column];
      }
      return [...curr, column, header[one]];
    }
    return [...curr, column];
  }, []);

  return {
    ...state,
    header: next,
    horizontal: resolveScrollableData(next, getWidth),
  };
}

export default reduce;
