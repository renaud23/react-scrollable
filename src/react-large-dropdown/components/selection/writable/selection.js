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

  const onChangeItems = useCallback(
    function (items, value) {
      dispatch(actions.onChangeDisplayedItems(items, value));
    },
    [dispatch]
  );

  const onChange = useCallback(
    async function (e) {
      const { value } = e.target;
      const items = await searching(value, list);
      dispatch(actions.onChangeSearch(value));
      onChangeItems(items, value);
    },
    [list, dispatch]
  );

  function onClickCallback(e) {
    onClick();
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
