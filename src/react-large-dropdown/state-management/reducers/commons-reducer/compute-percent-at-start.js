function computePercentAtStart(index, vertical, optionsHeight) {
  const { size, maxSize } = vertical;
  return (index * optionsHeight) / (maxSize - size);
}

export default computePercentAtStart;
