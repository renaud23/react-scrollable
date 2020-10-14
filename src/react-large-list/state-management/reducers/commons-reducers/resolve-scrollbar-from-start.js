import resolveScrollPercent from "./resolve-scroll-percent";
import computeSeuil from "./compute-seuil";
import resolveNb from "./resolve-nb";

function resolve(scrollbar) {
  const next = resolveScrollPercent(scrollbar);
  return resolveNb(next, computeSeuil(next));
}

export default resolve;
