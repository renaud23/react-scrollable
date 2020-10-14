import React, { useState } from "react";
import classnames from "classnames";
import ListContent from "./list-content";
import { OffsetChar } from "../commons-scrollable";
import { LargeScrollableContainer } from "./scrollable";
import "./react-large-list.scss";

let __REACT_LARGE_LIST_INDEX__ = 1;

function getId() {
  return `react-large-list-${__REACT_LARGE_LIST_INDEX__++}`;
}

/* */
function ReactLargeList({ className, list, offsetChar }) {
  const [id] = useState(() => getId());
  return (
    <div className={classnames("react-large-list", className)}>
      <LargeScrollableContainer id={id} data={{ list, offsetChar }}>
        <ListContent id={id} list={list} offsetChar={offsetChar} />
      </LargeScrollableContainer>
    </div>
  );
}

export default function WrappingOffsetchar(props) {
  return (
    <OffsetChar>
      <ReactLargeList {...props} />
    </OffsetChar>
  );
}
