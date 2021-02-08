import React, { useReducer, useEffect } from "react";
import Dropdown from "./components";
import PropTypes from "prop-types";
import {
  reducers,
  INITIAL_STATE,
  DropdownContext,
  actions,
} from "./state-management";

function DefaultItemRenderer() {
  return null;
}

function ReactLargeDropdown({
  list,
  disabled,
  writable,
  itemRenderer,
  className,
}) {
  const [state, dispatch] = useReducer(reducers, INITIAL_STATE);

  useEffect(
    function () {
      dispatch(actions.onUpdateProps({ list, disabled, writable }));
    },
    [list, disabled, writable]
  );
  return (
    <DropdownContext.Provider value={[state, dispatch]}>
      <Dropdown className={className} itemRenderer={itemRenderer} />
    </DropdownContext.Provider>
  );
}

ReactLargeDropdown.propTypes = {
  writable: PropTypes.bool,
  className: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  itemRenderer: PropTypes.func,
};

ReactLargeDropdown.defaultProps = {
  itemRenderer: DefaultItemRenderer,
  className: undefined,
  writable: false,
};

export default ReactLargeDropdown;
