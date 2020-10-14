import { computeCumulsSize } from "./commons-reducers";

function getSize({ __height }) {
  return __height;
}

function resolveVertical(scollable, list) {
  const cumulsSize = computeCumulsSize(list, getSize);
  const max = list.length;
  const maxSize = cumulsSize[cumulsSize.length - 1];
  return { ...scollable, cumulsSize, max, maxSize };
}

function reduce(state, action) {
  const { vertical } = state;
  const { payload } = action;
  const { data } = payload;
  const { list } = data;

  return { ...state, vertical: resolveVertical(vertical, list) };
}

export default reduce;
