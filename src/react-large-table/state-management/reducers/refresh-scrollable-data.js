import { computeCumulsSize } from "../../../commons-scrollable";

function resolve(array = [], getSize) {
  const cumulsSize = computeCumulsSize(array, getSize);
  const max = array.length;
  const maxSize = cumulsSize[max];
  return { max, maxSize, cumulsSize };
}

export default resolve;
