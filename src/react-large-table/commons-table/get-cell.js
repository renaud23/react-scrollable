import getPath from "./get-path";

function getCell(column, row) {
  const path = getPath(column);
  return path in row ? row[path] : undefined;
}

export default getCell;
