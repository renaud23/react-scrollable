import React from "react";
import "./rowable-scrollable-content.scss";

function RowableScrollableContent({
  vertical,
  horizontal,
  verticalStart,
  marginTop,
  verticalNb,
  horizontalStart,
  marginLeft,
  horizontalNb,
}) {
  if (!verticalNb || !horizontalNb) return null;
  const { cumulsSize: vCumuls } = vertical;
  const { cumulsSize: hCumuls } = horizontal;

  const data = new Array(verticalNb).fill(null).map((_, j) => {
    const start = verticalStart + j;
    const height = vCumuls[start + 1] - vCumuls[start];

    const cells = new Array(horizontalNb).fill(null).map((_, i) => {
      const startCell = horizontalStart + i;
      const width = hCumuls[startCell + 1] - hCumuls[startCell];

      return (
        <td style={{ width }} key={startCell}>
          <div className="cell-content">{`[${start},${startCell}]`}</div>
        </td>
      );
    });
    return (
      <tr key={start} style={{ height }}>
        {cells}
      </tr>
    );
  });
  return (
    <div className="rowable-example-content">
      <table>
        <tbody style={{ marginTop, marginLeft }}>{data}</tbody>
      </table>

      <ul className="layer">
        <li>horizontal is scroll to {horizontalStart} of logical columns.</li>
        <li>vertical is scroll to {verticalStart} of logical columns.</li>
        <li>
          {verticalNb} elements can be draw vertically with a top margin of
          {marginTop} px.
        </li>
        <li>
          {horizontalNb} elements can be draw horizontally with a left margin of
          {marginLeft} px.
        </li>
      </ul>
    </div>
  );
}

export default RowableScrollableContent;
