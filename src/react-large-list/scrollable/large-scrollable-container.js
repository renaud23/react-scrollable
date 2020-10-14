import React, { useReducer, useEffect, useCallback } from "react";
import ReactScrollable from "../../react-scrollable";
import {
  ScrollableContext,
  reducer,
  INITIAL_STATE,
  actions,
} from "../state-management";

function LargeScrollableContainer({ children, data, id }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const { horizontal, vertical } = state;
  const { maxSize: maxHeight, scrollRequest: verticalScrollRequest } = vertical;
  const { maxSize: maxWidth } = horizontal;

  const onResizeCallback = useCallback(function (width, height) {
    dispatch(actions.onResize(width, height));
  }, []);

  const onVerticalScrollCallback = useCallback(
    function (percent) {
      dispatch(actions.onVerticalScroll(percent));
    },
    [dispatch]
  );

  const onHorizontalScrollCallback = useCallback(
    function (percent) {
      dispatch(actions.onHorizontalScroll(percent));
    },
    [dispatch]
  );

  useEffect(
    function () {
      dispatch(actions.onRefreshData(data));
    },
    [data]
  );

  return (
    <ScrollableContext.Provider value={[state, dispatch]}>
      <ReactScrollable
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        onHorizontalScroll={onHorizontalScrollCallback}
        onVerticalScroll={onVerticalScrollCallback}
        verticalScrollPercentRequest={verticalScrollRequest}
        horizontalScrollPercentRequest={undefined}
        onResize={onResizeCallback}
        middleware={undefined}
        idContent={id}
      >
        {React.cloneElement(React.Children.only(children), {
          ...vertical,
        })}
      </ReactScrollable>
    </ScrollableContext.Provider>
  );
}

export default LargeScrollableContainer;
