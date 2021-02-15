function refresh(scrollbar, margin) {
  if (margin !== undefined) {
    return { ...scrollbar, margin };
  }
  return scrollbar;
}

export default refresh;
