import React, { useState, useRef, useEffect, useCallback } from "react";
import { safeCss } from "../../commons-scrollable";

function InputField({ cell, setValue, row, column, getValue, height, onBlur }) {
  const inputEl = useRef();
  const [value, setValue_] = useState(getValue(cell));

  /* */
  const onFocusCallback = useCallback(
    function () {
      const { current } = inputEl;
      if (current) {
        current.setSelectionRange(0, current.selectionStart);
      }
    },
    [inputEl]
  );

  /* */
  const onChangeCallback = useCallback(function (e) {
    setValue_(e.target.value);
  }, []);

  /* */
  const onBlurCallback = useCallback(
    function (e) {
      setValue(cell, value, row, column);
      onBlur();
    },
    [cell, value, setValue, onBlur, row, column]
  );

  const onKeyDownCallback = useCallback(
    function (e) {
      e.stopPropagation();
      //   e.preventDefault();
      if (e.key === "Escape") {
        onBlur();
      } else if (e.key === "Enter") {
        setValue(cell, value, row, column);
        onBlur();
      }
    },
    [onBlur, setValue, cell, value, row, column]
  );

  /* */
  useEffect(
    function () {
      const { current } = inputEl;
      if (current) {
        current.focus({
          preventScroll: true,
        });
      }
    },
    [inputEl]
  );

  return (
    <input
      ref={inputEl}
      value={value}
      style={{ lineHeight: safeCss(height) }}
      onBlur={onBlurCallback}
      onChange={onChangeCallback}
      onFocus={onFocusCallback}
      onKeyDown={onKeyDownCallback}
    />
  );
}

export default InputField;
