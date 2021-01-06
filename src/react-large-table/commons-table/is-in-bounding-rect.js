function isInBoundingRect(x, y, rect) {
  const { left, top, height, width } = rect;
  if (x >= left && x <= left + width && y >= top && y <= top + height) {
    return true;
  }
  return false;
}

export default isInBoundingRect;
