function resolve(vertical, percent = 0, rowHeight = 20) {
  const { maxSize, max, size } = vertical;
  if (max) {
    const position = percent * (maxSize - size);
    const start = Math.trunc(position / rowHeight);
    const margin = Math.trunc(start * rowHeight - position);
    const nb = Math.min(Math.ceil((Math.abs(margin) + size) / rowHeight), max);
    return { ...vertical, start, margin, nb };
  }

  return { ...vertical, nb: 0 };
}

export default resolve;
