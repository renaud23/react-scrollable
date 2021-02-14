import React, { useContext, useCallback, useEffect } from "react";
import classnames from "classnames";
import { useResizeObserver } from "../../../../commons-scrollable";
import { DropdownContext, actions } from "../../../state-management";
import ReactScrollable from "../../../../react-scrollable";
import OptionListContent from "./option-list-content.js";

function OptionList({ itemRenderer, onSelect, onKeyDown }) {
  const [state, dispatch] = useContext(DropdownContext);
  const { vertical, horizontal, verticalScrollRequest, expended } = state;
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

  useEffect(
    function () {
      if (expended && panelHeight) {
        dispatch(actions.onExpendPanel());
      }
    },
    [expended, panelHeight, dispatch]
  );

  const onKeyDownCallback = useCallback(
    function (e) {
      const { key } = e;
      onKeyDown(key);
    },
    [onKeyDown]
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
      verticalScrollRequest={verticalScrollRequest}
      onKeyDown={onKeyDownCallback}
    >
      <OptionListContent
        ref={containerEl}
        itemRenderer={itemRenderer}
        onSelect={onSelect}
        onKeyDown={onKeyDown}
      />
    </ReactScrollable>
  );
}

export default OptionList;
