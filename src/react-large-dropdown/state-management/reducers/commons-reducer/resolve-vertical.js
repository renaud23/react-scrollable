function resolve(vertical, percent = 0, rowHeight = 20) {
  const { maxSize, max, size } = vertical;
  if (max) {
    const position = percent * (maxSize - size);
    const start = Math.trunc(position / rowHeight);
    const margin = start * rowHeight - position;
    const nb = Math.ceil((Math.abs(margin) + size) / rowHeight);
    return { ...vertical, start, margin, nb };
  }

  return vertical;
}

export default resolve;
