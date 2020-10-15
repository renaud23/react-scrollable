function compute(array, getSize) {
  return array.reduce(
    function (current, o) {
      const size = getSize(o);
      const last = current[current.length - 1];
      return [...current, last + size];
    },
    [0]
  );
}

export default compute;
