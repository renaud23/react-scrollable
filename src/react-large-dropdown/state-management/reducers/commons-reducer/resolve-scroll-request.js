function resolve(index, vertical, optionsHeight) {
  const { start, nb, max, maxSize, size } = vertical;
  if (index < start || index >= start + nb) {
    const target = Math.min(index, max - nb + 1);
    const percent = (target * optionsHeight) / (maxSize - size);
    return { percent };
  }
  return undefined;
}

export default resolve;
