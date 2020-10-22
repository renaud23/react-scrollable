import { useContext } from "react";

function useDispatch(context) {
  const dispatch = useContext(context)[1];

  return dispatch;
}

export default useDispatch;
