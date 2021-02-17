import { isWorkerCompatible } from "../search-tools";
import CreateIndexWorker from "./create-index.worker";
import createIndex from "./create-index";

function create(fields = [], entities = []) {
  return new Promise(function (resolve) {
    if (isWorkerCompatible()) {
      const worker = new CreateIndexWorker();
      worker.postMessage({ fields, entities });
      worker.addEventListener("message", function (e) {
        const { data } = e;
        resolve(data);
      });
    } else {
      return Promise.resolve(createIndex(fields, entities));
    }
  });
}

export default create;
