import { resolveVertical } from "./commons-reducer";

function checkVertical(vertical, items, optionsHeight) {
  const { length: max } = items;
  return resolveVertical({
    ...vertical,
    max,
    maxSize: optionsHeight * max,
    percent: 0,
  });
}

function reduce(state, action) {
  const { payload } = action;
  const { items, search } = payload;
  const { vertical, list, optionsHeight } = state;
  const items_ = search.trim().length ? items : list;

  const { search: origin } = state;
  if (origin === search) {
    return {
      ...state,
      selectedIndex: undefined,
      vertical: checkVertical(vertical, items_, optionsHeight),
      search,
      displayedItems: items_,
    };
  }
  return state;
}

export default reduce;
