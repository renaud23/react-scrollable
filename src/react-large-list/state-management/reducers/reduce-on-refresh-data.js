import { computeCumulsSize } from "./commons-reducers";

function getHeight({ __height }) {
  return __height || 0;
}

function reduceVertical(state, action) {
  const { vertical, list: old } = state;
  const { payload } = action;
  const { data } = payload;
  const { list } = data;
  if (old !== list && list && list.length) {
    const cumulsSize = computeCumulsSize(list, getHeight);
    const max = list.length;
    const maxSize = cumulsSize[cumulsSize.length - 1];
    return {
      ...state,
      vertical: { ...vertical, cumulsSize, max, maxSize },
      list,
    };
  }
  return state;
}

function getWidth({ __width }) {
  return __width || 0;
}

function reduceHorizontal(state, action) {
  const { horizontal, offsetChar: old, list: oldList } = state;
  const { payload } = action;
  const { data } = payload;
  const { offsetChar, list } = data;
  if (offsetChar !== old || list !== oldList) {
    const max = list.reduce(function (curr, o) {
      return Math.max(getWidth(o), curr);
    }, 0);
    const cumulsSize = computeCumulsSize(
      new Array(max).fill(null),
      () => offsetChar
    );
    const maxSize = cumulsSize[max - 1];
    return {
      ...state,
      horizontal: { ...horizontal, cumulsSize, max, maxSize },
      offsetChar,
    };
  }

  return state;
}

function reduce(state, action) {
  return reduceHorizontal(reduceVertical(state, action), action);
}

export default reduce;
