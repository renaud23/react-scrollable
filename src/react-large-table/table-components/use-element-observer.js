import { useRef, useEffect } from "react";

const MAP_ELEMENTS = {};

function useThObserver(id) {
  const ref = useRef();

  useEffect(
    function () {
      const { current } = ref;
      if (current) {
        MAP_ELEMENTS[id] = current;
      }

      return function () {
        delete MAP_ELEMENTS[id];
      };
    },
    [ref, id]
  );

  return ref;
}

export function getElements() {
  return { ...MAP_ELEMENTS };
}

export default useThObserver;
