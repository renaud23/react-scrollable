import computeSeuil from "./compute-seuil";
import resolveStart from "./resolve-start";
import resolveMargin from "./resolve-margin";
import resolveNb from "./resolve-nb";

function resolve(scrollbar, getSize) {
  const { maxSize, size } = scrollbar;
  if (maxSize && size) {
    const seuil = computeSeuil(scrollbar);
    return resolveNb(
      resolveMargin(resolveStart(scrollbar, seuil), seuil),
      seuil
    );
  }

  return scrollbar;
}

export default resolve;
