import { useEffect } from "react";

const BINDED = [
  "mouseup",
  "mousedown",
  "mousemove",
  "mouseenter",
  "mouseleave",
];
const ON_DOCUMENT_OBSERVER = BINDED.reduce((a, k) => ({ ...a, [k]: [] }), {});

const HOOKS = BINDED.reduce(
  (a, k) => ({
    ...a,
    [k]: function (e) {
      ON_DOCUMENT_OBSERVER[k].forEach((c) => {
        c(e);
      });
    },
  }),
  {}
);

function useDocumentEventListener(event, callback) {
  useEffect(
    function () {
      if (event in ON_DOCUMENT_OBSERVER) {
        ON_DOCUMENT_OBSERVER[event].push(callback);
      }
    },
    [callback, event]
  );

  /* */
  //   const onMouseDown = useCallback(function (e) {
  //     ON_DOCUMENT_OBSERVER["mousedown"].forEach(function (c) {
  //       c.call(e);
  //     });
  //   }, []);

  useEffect(function () {
    Object.entries(HOOKS).forEach(function ([e, c]) {
      document.addEventListener(e, c);
    });
    return function () {
      Object.entries(HOOKS).forEach(function ([e, c]) {
        document.removeEventListener(e, c);
      });
      Object.values(ON_DOCUMENT_OBSERVER).forEach((k) => {
        k.length = 0;
      });
    };
  }, []);
}

export function useUnsubscribe(event, callback) {
  if (event in ON_DOCUMENT_OBSERVER) {
    const pos = ON_DOCUMENT_OBSERVER[event].indexOf(callback);
    if (pos !== -1) {
      ON_DOCUMENT_OBSERVER[event].splice(pos, 1);
    }
  }
}

export default useDocumentEventListener;
