function getPath(column) {
  if (column) {
    const { path } = column;
    return path;
  }
  return undefined;
}

export default getPath;
