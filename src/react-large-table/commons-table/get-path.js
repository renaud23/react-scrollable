function getPath(column) {
  if (typeof column === "object") {
    const { path } = column;
    return path;
  }
  return undefined;
}

export default getPath;
