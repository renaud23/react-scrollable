function compute(scrollbar) {
  const { scrollPercent, maxSize, size } = scrollbar;
  if (maxSize && size) {
    return scrollPercent * (maxSize - size);
  }
  return 0;
}

export default compute;
