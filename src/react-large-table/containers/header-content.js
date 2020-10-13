import React, { useContext } from "react";
import { TableContext } from "../state-management";
import Th from "../components/th";

function DefaultHeaderContentRenderer({ label }) {
  return <span className="th-el-container">{label}</span>;
}

function HeaderContent() {
  const [state] = useContext(TableContext);
  const { horizontal, header, headerHeight } = state;
  const { start, nb } = horizontal;

  if (nb) {
    return new Array(nb).fill(null).map(function (_, i) {
      const column = header[start + i];
      const { width = 20, label = `Column ${i}` } = column;
      return (
        <Th
          key={start + i}
          width={width}
          height={headerHeight}
          index={start + i}
        >
          <DefaultHeaderContentRenderer label={label} />
        </Th>
      );
    });
  }
  return null;
}

export default HeaderContent;
