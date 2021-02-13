import React, { useCallback, useContext } from "react";
import classnames from "classnames";
import { DropdownContext, actions } from "../../../state-management";
import "./selection.scss";

function Selection({
  onClick,
  onFocus,
  onKeyDown,
  selection,
  placeHolder,
  searching,
}) {
  const [state, dispatch] = useContext(DropdownContext);
  const { list, search } = state;
  const onKeyDownCallback = useCallback(
    function (e) {
      const { key } = e;
      if (key === "Home" || key === "End") {
        e.preventDefault();
      }
      onKeyDown(key);
    },
    [onKeyDown]
  );

  function onClickCallback(e) {
    onClick();
  }

  const onChangeItems = useCallback(
    function (items, value) {
      dispatch(actions.onChangeDisplayedItems(items, value));
    },
    [dispatch]
  );

  function onChange(e) {
    const { value } = e.target;
    searching(value, list).then(function (items) {
      onChangeItems(items, value);
    });
  }

  return (
    <div className={classnames("dropdown-selection-content", "writable")}>
      <input
        aria-haspopup="listbox"
        type="text"
        onClick={onClickCallback}
        onFocus={onFocus}
        onKeyDown={onKeyDownCallback}
        onChange={onChange}
        value={search}
      />
    </div>
  );
}

export default Selection;
