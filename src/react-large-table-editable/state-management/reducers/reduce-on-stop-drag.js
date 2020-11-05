function isEquals(anchor, extent) {
  return (
    anchor.type === extent.type &&
    anchor.column === extent.column &&
    anchor.row === extent.row
  );
}

function getCellSelection(anchor, extent) {
  const minx = Math.min(anchor.column, extent.column);
  const maxx = Math.max(anchor.column, extent.column);
  const miny = Math.min(anchor.row, extent.row);
  const maxy = Math.max(anchor.row, extent.row);
  return { rule: { cell: { row: [miny, maxy], column: [minx, maxx] } } };
}

function getHeadSelection(anchor, extent) {
  return undefined;
}

function getSelection(anchor, extent) {
  const { type } = anchor;
  if (type === "cell") {
    return getCellSelection(anchor, extent);
  } else if (type === "head") {
    return getHeadSelection(anchor, extent);
  }
  return undefined;
}

function reduce(state) {
  const { anchor, extent } = state;
  if (extent && anchor && !isEquals(anchor, extent)) {
    return {
      ...state,
      drag: false,
      anchor: undefined,
      extent: undefined,
      selection: getSelection(anchor, extent),
    };
  }

  return {
    ...state,
    drag: false,
    anchor: undefined,
    extent: undefined,
    selection: undefined,
  };
}

export default reduce;
