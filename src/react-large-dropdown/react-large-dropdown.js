import React, { useReducer, useEffect } from "react";
import Dropdown from "./components";
import PropTypes from "prop-types";
import { searchByPrefix } from "./searching";
import {
  reducers,
  INITIAL_STATE,
  DropdownContext,
  actions,
} from "./state-management";

function empty() {}

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
  onSelect,
  id,
  labelledBy,
  placeHolder,
  searching,
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
          id,
          labelledBy,
          placeHolder,
        })
      );
    },
    [
      list,
      disabled,
      writable,
      optionsHeight,
      panelMaxWidth,
      id,
      labelledBy,
      placeHolder,
    ]
  );

  return (
    <DropdownContext.Provider value={[state, dispatch]}>
      <Dropdown
        className={className}
        itemRenderer={itemRenderer}
        onSelect={onSelect}
        searching={searching}
      />
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
  onSelect: PropTypes.func,
  id: PropTypes.string,
  labelledBy: PropTypes.string,
  placeHolder: PropTypes.string,
  searching: PropTypes.func,
};

ReactLargeDropdown.defaultProps = {
  itemRenderer: DefaultItemRenderer,
  className: undefined,
  writable: false,
  optionsHeight: 26,
  panelMaxWidth: 450,
  onSelect: empty,
  id: undefined,
  labelledBy: undefined,
  placeHolder: "Placeholder...",
  searching: searchByPrefix,
};

export default ReactLargeDropdown;
