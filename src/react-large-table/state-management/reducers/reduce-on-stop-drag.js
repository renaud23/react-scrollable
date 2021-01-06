import resolveScrollableData from "./refresh-scrollable-data";
import { getWidth } from "../../commons-table";

function reduceDragColumn(state) {
  const { dragged, header } = state;
  const { target, initial } = dragged;

  if (target) {
    const { index: one } = initial;
    const { index: two, position } = target;
    const next = header.reduce(function (curr, column, index) {
      if (index === one) {
        return curr;
      }

      if (index === two) {
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
      dragged: undefined,
    };
  }

  return { ...state, dragged: undefined };
}

function reduce(state) {
  const { dragged } = state;
  const { type } = dragged;

  switch (type) {
    case "drag/column":
      return reduceDragColumn(state);

    default:
      return { ...state, dragged: undefined };
  }
}

export default reduce;
