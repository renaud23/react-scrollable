function getCell(column, row) {
  const { path } = column;
  return path in row ? row[path] : {};
}

export default getCell;
