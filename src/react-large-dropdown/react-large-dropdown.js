import React, { useReducer, useEffect } from "react";
import Dropdown from "./components";
import PropTypes from "prop-types";
import {
  reducers,
  INITIAL_STATE,
  DropdownContext,
  actions,
} from "./state-management";

function DefaultItemRenderer({ item }) {
  const { label } = item;
  return <div className="dropdown-item">{label}</div>;
}

function ReactLargeDropdown({
  list,
  disabled,
  writable,
  itemRenderer,
  optionsHeight,
  panelMaxWidth,
  className,
}) {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);

  useEffect(
    function () {
      dispatch(
        actions.onUpdateProps({
          list,
          disabled,
          writable,
          optionsHeight,
          panelMaxWidth,
        })
      );
    },
    [list, disabled, writable, optionsHeight, panelMaxWidth]
  );

  return (
    <DropdownContext.Provider value={[state, dispatch]}>
      <Dropdown className={className} itemRenderer={itemRenderer} />
    </DropdownContext.Provider>
  );
}

ReactLargeDropdown.propTypes = {
  optionsHeight: PropTypes.number,
  panelMaxWidth: PropTypes.number,
  writable: PropTypes.bool,
  className: PropTypes.string,
  list: PropTypes.array.isRequired,
  itemRenderer: PropTypes.func,
};

ReactLargeDropdown.defaultProps = {
  itemRenderer: DefaultItemRenderer,
  className: undefined,
  writable: false,
  optionsHeight: 26,
  panelMaxWidth: 450,
};

export default ReactLargeDropdown;
