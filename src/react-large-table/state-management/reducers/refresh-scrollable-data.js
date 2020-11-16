import { computeCumulsSize } from "../../../commons-scrollable";

function resolveFixed(array, fixedValue) {
  const max = array.length;
  const maxSize = max * fixedValue;
  return { max, maxSize };
}

function resolveVariable(array, getSize) {
  const cumulsSize = computeCumulsSize(array, getSize);
  const max = array.length;
  const maxSize = cumulsSize[max];
  return { max, maxSize, cumulsSize };
}

function resolve(array = [], getSize, fixedValue) {
  if (!fixedValue) {
    return resolveVariable(array, getSize);
  }
  return resolveFixed(array, fixedValue);
}

export default resolve;
