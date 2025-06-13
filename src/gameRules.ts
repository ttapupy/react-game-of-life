import { ICell } from "./pages/SmartBoard";

export const adjacentValues = (cell: ICell, table: ICell[][]): number => {
  const { row, col } = cell;
  const rowMin = Math.max(row - 1, 0);
  const rowMax = Math.min(row + 1, table.length - 1);
  const colMin = Math.max(col - 1, 0);
  const colMax = Math.min(col + 1, table[0]?.length - 1);

  let count = 0;
  for (let r = rowMin; r <= rowMax; r++) {
    const current = table[r];
    for (let c = colMin; c <= colMax; c++) {
      if (!(r === row && c === col)) {
        count += current[c].value;
      }
    }
  }
  return count;
};

export const survive = (cell: ICell, neighborsSum: number) => {
  const isAlive = cell.value === 1;
  return isAlive ? neighborsSum === 2 || neighborsSum === 3 : neighborsSum === 3;
};
