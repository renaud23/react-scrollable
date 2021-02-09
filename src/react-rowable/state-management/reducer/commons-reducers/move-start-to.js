function moveStartTo(scrollbar, index) {
  const { max, nb } = scrollbar;
  return Math.min(Math.max(index, 0), max - nb);
}

export default moveStartTo;
