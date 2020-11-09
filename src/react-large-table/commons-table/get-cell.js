import { getPath } from "../../commons-scrollable";

function getCell(column, row) {
  const path = getPath(column);
  return path in row ? row[path] : {};
}

export default getCell;
