import React, { useReducer, useEffect } from "react";
import { reducers, INITIAL_STATE, actions } from "./state-management";
import LargeScrollableContainer from "../react-large-scrollable";
import Content from "./large-tree-content";
import "./react-large-tree.scss";

function ReactLargeTree({ root }) {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);
  const { horizontal, vertical, rows } = state;

  useEffect(
    function () {
      if (root) {
        dispatch(actions.onRefreshData(root));
      }
    },
    [root]
  );
  return (
    <div className="react-large-tree">
      <LargeScrollableContainer horizontal={horizontal} vertical={vertical}>
        <Content rows={rows} />
      </LargeScrollableContainer>
    </div>
  );
}

export default ReactLargeTree;
