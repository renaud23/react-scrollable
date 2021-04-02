import { isInBoundingRect } from "../../commons-table";
import { DRAGGED_ELEMENT, POSITION } from "../../commons-table";

function reduceOnDragColumn(state, action) {
  const { dragged, domEntities, header } = state;
  const { initial } = dragged;
  const { index: refIndex } = initial;
  const { th } = domEntities;

  if (th !== undefined) {
    const { payload } = action;
    const { x, y } = payload;

    const target = Object.entries(th).reduce(function (a, [stringIdx, el]) {
      const rect = el.getBoundingClientRect();
      const index = Number.parseInt(stringIdx);
      if (refIndex !== index && isInBoundingRect(x, y, rect)) {
        const { left, width } = rect;
        const position = x < left + width / 2 ? POSITION.left : POSITION.right;
        return {
          el,
          index: Number.parseInt(index),
          data: header[index],
          position,
        };
      }
      return a;
    }, undefined);

    return { ...state, dragged: { ...dragged, target } };
  }

  return state;
}

function reduce(state, action) {
  const { dragged } = state;
  if (dragged) {
    const { type } = dragged;
    switch (type) {
      case DRAGGED_ELEMENT.column:
        return reduceOnDragColumn(state, action);

      default:
        return { ...state, dragged: undefined };
    }
  }
  return state;
}

export default reduce;
