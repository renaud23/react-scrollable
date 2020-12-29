import { useContext, useEffect, useRef } from "react";
import TableContext from "./table-context";
import { useDispatch } from "../../commons-scrollable";
import * as actions from "./actions";

function useKeepDomEntities(id, type) {
  const dispatch = useDispatch(TableContext);
  const ref = useRef();

  useEffect(
    function () {
      const { current } = ref;
      if (current) {
        dispatch(actions.addEntity(id, type, current));
      }
      return function () {
        dispatch(actions.removeEntity(id, type));
      };
    },
    [ref, dispatch, id, type]
  );

  return ref;
}

export function useDomEntities(type) {
  const [{ domEntities }] = useContext(TableContext);
  if (type in domEntities) {
    return { ...domEntities[type] };
  }
  return {};
}

export default useKeepDomEntities;
