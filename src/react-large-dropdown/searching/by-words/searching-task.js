import { isWorkerCompatible } from "../search-tools";
import SearchingWorker from "./searching.worker";
import searching from "./searching";

function createTask(index) {
  return async function (search, items) {
    return new Promise(function (resolve) {
      if (isWorkerCompatible()) {
        const worker = new SearchingWorker();
        worker.postMessage({ search, items, index });
        worker.addEventListener("message", function (e) {
          const { data } = e;
          resolve(data);
        });
      } else {
        return Promise.resolve(searching(search, items, index));
      }
    });
  };
}

export default createTask;
