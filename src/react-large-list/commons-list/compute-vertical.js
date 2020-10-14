import computeCumulsSize from "./compute-cumuls-size";

function getHeight({ __height }) {
  return __height || 0;
}

function compute(list) {
  const cumulsSize = computeCumulsSize(list, getHeight);
  const max = list.length;
  const maxSize = cumulsSize[cumulsSize.length - 1];
  return { cumulsSize, max, maxSize };
}

export default compute;
