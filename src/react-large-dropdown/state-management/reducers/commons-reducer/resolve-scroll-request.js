// import computePercentAtEnd from "./compute-percent-at-end";
// import computePercentAtStart from "./compute-percent-at-start";

function resolve(index, vertical, optionsHeight) {
  const { start, nb, max, maxSize, size } = vertical;
  if (index < start || index >= start + nb) {
    const target = Math.min(index, max - nb + 1);
    const percent = (target * optionsHeight) / (maxSize - size);
    return { percent };
  }
  // if (index !== undefined && index >= start + nb) {
  //   const percent = computePercentAtEnd(index, vertical, optionsHeight);
  //   return { percent };
  // }
  // if (index < start) {
  //   const percent = computePercentAtStart(index, vertical, optionsHeight);
  //   return { percent };
  // }
  return undefined;
}

export default resolve;
