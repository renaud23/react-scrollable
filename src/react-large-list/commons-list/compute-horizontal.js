import computeCumulsSize from "./compute-cumuls-size";

function getWidth({ __width }) {
  return __width || 0;
}

function compute(list, offsetChar) {
  const max = list.reduce(function (curr, o) {
    return Math.max(getWidth(o), curr);
  }, 0);
  const cumulsSize = computeCumulsSize(
    new Array(max).fill(null),
    () => offsetChar
  );
  const maxSize = cumulsSize[max - 1];
  return { cumulsSize, max, maxSize };
}

export default compute;
