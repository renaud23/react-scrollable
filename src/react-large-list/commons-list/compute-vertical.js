import { computeCumulsSize } from "../../commons-scrollable";

function getHeight({ __height }) {
  return __height || 0;
}

function compute(list) {
  const cumulsSize = computeCumulsSize(list, getHeight);
  const max = list.length;
  const maxSize = cumulsSize[max];
  return { cumulsSize, max, maxSize };
}

export default compute;
