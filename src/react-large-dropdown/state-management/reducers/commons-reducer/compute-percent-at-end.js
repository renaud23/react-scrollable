function computeNb(vertical, optionsHeight) {
  const { size, margin } = vertical;
  return Math.ceil((size - margin) / optionsHeight);
}

function computePercentAtEnd(index, vertical, optionsHeight) {
  const { size, maxSize } = vertical;
  const nb = computeNb(vertical, optionsHeight);
  const position = index - nb + 1;
  return (position * optionsHeight) / (maxSize - size);
}

export default computePercentAtEnd;
