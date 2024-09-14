import { ICell, CellValue } from "./pages/SmartBoard";

// Returns whether an element index is inside drawer canvas
export const isInDrawer = ({
  drawSize,
  side,
  index,
}: {
  drawSize: number;
  side: number;
  index: number;
}) => {
  const margin = (side - drawSize) / 2;
  return !(index < margin || index >= side - margin);
};

export const calcDrawer = ({
  table,
  rows,
  columns,
  drawSize,
}: {
  table: ICell[][];
  rows: number;
  columns: number;
  drawSize: number;
}): CellValue[][] => {
  const tableRows = table.filter((_, rowIndex) =>
    isInDrawer({ drawSize, side: rows, index: rowIndex }),
  );

  return tableRows.map((tableRow) =>
    tableRow
      .filter((_, columnIndex) => {
        return isInDrawer({ drawSize, side: columns, index: columnIndex });
      })
      .map((cell) => cell["value"]),
  );
};
