import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import classnames from "classnames";
import { DropdownContext, actions } from "../../../state-management";
import "./selection.scss";

function getLabel(label, placeHolder) {
  if (typeof label === "string" && label.length) {
    return label;
  }
  return placeHolder;
}

function isSearch(search) {
  if (typeof search === "string" && search.length) {
    return true;
  }

  return false;
}

function Delete({ display, onClick }) {
  if (display) {
    return <div role="button" className="delete" onClick={onClick}></div>;
  }
  return null;
}

function Selection({ onClick, onFocus, onKeyDown, placeHolder, searching }) {
  const [state, dispatch] = useContext(DropdownContext);
  const { list, displayedItems, search, selectedIndex, labelledBy } = state;
  const [label, setLabel] = useState("");
  const [displayLabel, setDisplayLabel] = useState(true);
  const inputEl = useRef();

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

  const onDelete = useCallback(
    function () {
      dispatch(actions.onChangeSearch(""));
      onChangeItems(list, "");
    },
    [list]
  );

  const onChange = useCallback(
    async function (e) {
      const { value } = e.target;
      const items = await searching(value, list);
      dispatch(actions.onChangeSearch(value));
      onChangeItems(items, value);
      setDisplayLabel(false);
    },
    [list, dispatch]
  );

  function onClickCallback(e) {
    onClick();
  }

  function onBlurInput() {
    setDisplayLabel(true);
  }

  useEffect(
    function () {
      if (selectedIndex !== undefined) {
        setLabel(displayedItems[selectedIndex].label);
      } else {
        setLabel("");
      }
    },
    [selectedIndex]
  );

  useEffect(
    function () {
      if (selectedIndex !== undefined) {
        setDisplayLabel(true);
      }
    },
    [displayedItems, selectedIndex]
  );

  const onFocusCallback = useCallback(
    function () {
      setDisplayLabel(false);
      onFocus();
    },
    [onFocus]
  );

  function onclickLabel(e) {
    e.nativeEvent.stopImmediatePropagation();
    setDisplayLabel(false);
    inputEl.current.focus();
    onClick();
  }

  return (
    <>
      <Delete display={isSearch(search)} onClick={onDelete} />
      <div className={classnames("dropdown-selection-content", "writable")}>
        <button
          tabIndex="-1"
          aria-haspopup="listbox"
          className={classnames("dropdown-selection-label", {
            display: displayLabel,
          })}
          onClick={onclickLabel}
          aria-labelledby={labelledBy}
          onKeyDown={onKeyDownCallback}
        >
          {getLabel(label, placeHolder)}
        </button>
        <input
          tabIndex="0"
          className={classnames("", { display: !displayLabel })}
          aria-haspopup="listbox"
          type="text"
          onClick={onClickCallback}
          onFocus={onFocusCallback}
          onBlur={onBlurInput}
          onKeyDown={onKeyDownCallback}
          onChange={onChange}
          value={search}
          ref={inputEl}
        />
      </div>
    </>
  );
}

export default Selection;
