import React, { useState } from "react";
import classnames from "classnames";
import ReactRowable from "../react-rowable";
import { RowableScrollableContent } from "./commons-stories";
import "./react-rowable.scss";
import "../theme/scrollbar/cubik-theme.scss";
import "../theme/scrollbar/aqua-theme.scss";

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
  const [vertical] = useState(buildScrollableData(120, 70));
  const [horizontal] = useState(buildScrollableData(240, 250));
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
        <option value="aqua-theme">Studio</option>
      </select>
      <div className={classnames("react-rowable-example", { focused })}>
        <ReactRowable
          id="rowable-example"
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

const STORY = {
  title: "react-rowable",
  component: ReactRowable,
  argTypes: {},
};

export default STORY;
