import React from "react";
import classnames from "classnames";
import ListContent from "./list-content";
import { OffsetChar } from "../commons-scrollable";
import { LargeScrollableContainer } from "./scrollable";
import "./react-large-list.scss";

/* */
function ReactLargeList({ className, list, offsetChar }) {
  return (
    <div className={classnames("react-large-list", className)}>
      <LargeScrollableContainer data={{ list, offsetChar }}>
        <ListContent list={list} />
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
