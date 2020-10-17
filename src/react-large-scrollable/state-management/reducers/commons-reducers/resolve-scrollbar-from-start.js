import resolveScrollPercent from "./resolve-scroll-percent";
import resolveFromScrollPercent from "./resolve-scrollbar-from-scroll-percent";

function resolve(scrollbar) {
  const next = resolveScrollPercent(scrollbar);
  return resolveFromScrollPercent(next);
}

export default resolve;
