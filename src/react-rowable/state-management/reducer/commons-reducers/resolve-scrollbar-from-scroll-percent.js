import computeSeuil from "./compute-seuil";
import resolveStart from "./resolve-start";
import resolveMargin from "./resolve-margin";
import resolveNb from "./resolve-nb";

function resolve(rowable) {
  const { maxSize, size } = rowable;
  if (maxSize && size) {
    const seuil = computeSeuil(rowable);
    return resolveNb(resolveMargin(resolveStart(rowable, seuil), seuil), seuil);
  }

  return rowable;
}

export default resolve;
