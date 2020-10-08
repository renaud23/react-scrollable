function safe(value) {
  return value !== undefined ? value : 0;
}

export default safe;
