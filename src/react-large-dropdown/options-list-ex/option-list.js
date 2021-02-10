import React, { useContext, useCallback } from "react";
import { useResizeObserver } from "../../commons-scrollable";
import classnames from "classnames";
import { DropdownContext, actions } from "../state-management";
import ReactScrollable from "../../react-scrollable";
import OptionListContent from "./option-list-content.js";

function OptionList({ itemRenderer }) {
  const [state, dispatch] = useContext(DropdownContext);
  const { vertical, horizontal } = state;

  const { maxSize: maxHeight, size: panelHeight } = vertical;
  const { maxSize: maxWidth, size: panelWidth } = horizontal;

  const onVerticalScroll = useCallback(
    function (percent) {
      dispatch(actions.onVerticalScroll(percent));
    },
    [dispatch]
  );

  const onHorizontalScroll = useCallback(
    function (percent) {
      dispatch(actions.onHorizontalScroll(percent));
    },
    [dispatch]
  );

  const onResize = useCallback(
    function (w, h) {
      dispatch(actions.onResize(w, h));
      return [w, h];
    },
    [dispatch]
  );

  const containerEl = useResizeObserver(onResize);

  return (
    <ReactScrollable
      className={classnames("dropdown-options-list")}
      onVerticalScroll={onVerticalScroll}
      onHorizontalScroll={onHorizontalScroll}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      refWidth={panelWidth}
      refHeight={panelHeight}
    >
      <OptionListContent ref={containerEl} itemRenderer={itemRenderer} />
    </ReactScrollable>
  );
}

export default OptionList;
