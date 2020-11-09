function get(column) {
  if (typeof column === "object") {
    const { label } = column;
    return label;
  }
  return undefined;
}

export default get;
