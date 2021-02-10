// import { computeVertical, computeHorizontal } from "./commons-reducer";

// function reduce(state, action) {
//   const { payload } = action;
//   const { list, disabled, writable } = payload;
//   const { offsetChar } = state;

//   return {
//     ...state,
//     list,
//     disabled,
//     writable,
//     displayedItems: list,
//     vertical: computeVertical(list),
//     horizontal: computeHorizontal(list, offsetChar),
//   };
// }

function reduce(state, action) {
  const { payload } = action;
  const { list, disabled, writable } = payload;
  const { rowHeight, rowWidth, vertical, horizontal } = state;

  return {
    ...state,
    list,
    disabled,
    writable,
    displayedItems: list,
    vertical: {
      ...vertical,
      maxSize: list.length * rowHeight,
      max: list.length,
    },
    horizontal: { ...horizontal, maxSize: rowWidth },
  };
}

export default reduce;
