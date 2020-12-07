function moveStart(scrollbar, delta) {
  const { start, max, nb } = scrollbar;
  return Math.min(Math.max(start + delta, 0), max - nb);
}

export default moveStart;
