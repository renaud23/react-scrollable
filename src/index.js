import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { ScrollableContainer } from "./react-scrollable";
import "./custom-scrollable.scss";

function ScrollableComponent({ children }) {
  return <div className="custom-scrollable">{children}</div>;
}

function ScrollableContent() {
  return <div className="custom-component-content">{`My large component`}</div>;
}

function App() {
  const onKeyDown = useCallback(function () {}, []);
  const onWheel = useCallback(function () {}, []);
  return (
    <ScrollableComponent>
      <ScrollableContainer
        maxWidth={2000}
        maxHeight={10000}
        onKeyDown={onKeyDown}
        onWheel={onWheel}
      >
        <ScrollableContent />
      </ScrollableContainer>
    </ScrollableComponent>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
