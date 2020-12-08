import React, { useState } from "react";
import classnames from "classnames";
import ReactRowable from "../react-rowable";
import RowableScrollableContent from "./rowable-scrollable-content";
import "./react-rowable.scss";
import "./cubik-theme.scss";

function buildScrollableData(nb, size) {
  return {
    max: nb,
    maxSize: nb * size,
    cumulsSize: new Array(nb).fill(null).reduce(
      function (a, _, i) {
        return [...a, (i + 1) * size];
      },
      [0]
    ),
  };
}

export function ReactRowableDefault() {
  const [vertical] = useState(buildScrollableData(100, 60));
  const [horizontal] = useState(buildScrollableData(100, 200));
  const [focused, setFocused] = useState(false);
  const [theme, setTheme] = useState("");

  const onChange = function (e) {
    setTheme(e.target.value);
  };
  return (
    <>
      <select onChange={onChange}>
        <option value="">Par défaut</option>
        <option value="cubik-with-button">Cubik</option>
        <option value="cubik-without-button">Cubik sans bouton</option>
      </select>
      <div className={classnames("react-rowable-example", { focused })}>
        <ReactRowable
          id={"id"}
          vertical={vertical}
          horizontal={horizontal}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={theme}
        >
          <RowableScrollableContent
            vertical={vertical}
            horizontal={horizontal}
          />
        </ReactRowable>
      </div>
    </>
  );
}

export default {
  title: "react-rowable",
  component: ReactRowable,
  argTypes: {},
};
