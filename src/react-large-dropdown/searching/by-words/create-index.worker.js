/* eslint-disable no-restricted-globals */
import "core-js/stable";
import createIndex from "./create-index";

self.onmessage = function (e) {
  const { fields, entities } = e.data;
  const index = createIndex(fields, entities);

  self.postMessage(index);
};

export default () => null;
