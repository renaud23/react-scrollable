import { resolveRefreshData } from "./commons-reducer.js";

// function cumulWidth(tab, width) {
//   const last = tab[tab.length - 1];
//   return [...tab, width + last];
// }

// function cumulMaxWidth(max, width) {
//   return max + width;
// }

// function resolve(state) {
//   const { header } = state;
//   return header.reduce(
//     function ({ maxWidth, cumulColumnsWidth }, column) {
//       const { width } = column;
//       return {
//         maxWidth: cumulMaxWidth(maxWidth, width),
//         cumulColumnsWidth: cumulWidth(cumulColumnsWidth, width),
//       };
//     },
//     {
//       maxWidth: 0,
//       cumulColumnsWidth: [0],
//     }
//   );
// }

function getWidth({ width }) {
  return width;
}

function reduce(state) {
  // const { maxWidth, cumulColumnsWidth } = resolve(state);
  const { horizontal, header } = state;

  return {
    ...state,
    horizontal: { ...horizontal, ...resolveRefreshData(header, getWidth) },
  };
}

export default reduce;
