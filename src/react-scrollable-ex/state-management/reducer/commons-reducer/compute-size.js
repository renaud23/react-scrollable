function compute(scrollbar) {
  const { ref, sizeMax } = scrollbar;
  const size = sizeMax - ref * 2;
  if (size > 0) {
    return { ...scrollbar, size };
  }

  return scrollbar;
}

export default compute;
