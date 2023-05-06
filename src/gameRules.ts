// export interface ICell {
//   row: number;
//   col: number;
//   value: 0 | 1;
// }

import {ICell} from './pages/Board.tsx';

const adjacent = (ref: ICell, other: ICell): boolean => {
  const colAdj = Math.abs(ref.col - other.col)
  const rowAdj = Math.abs(ref.row - other.row)
  return (colAdj + rowAdj === 1) || (colAdj === 1 && rowAdj === 1)
}


const adjacentValues = (cell: ICell, table: ICell[][]): number => {
  const adjacents = table.flat().filter(tc => adjacent(tc, cell))
  return adjacents.reduce((prev, curr) => prev + curr['value'], 0)
}

const existingNext = (cell: ICell, table: ICell[][]): 0 | 1 => {
  const env = adjacentValues(cell, table)
  if (env === 2 || env === 3) {
    return 1
  }
  return 0
}

const nonExistingNext = (cell: ICell, table: ICell[][]): 0 | 1 => {
  const env = adjacentValues(cell, table)
  if (env === 3) {
    return 1
  }
  return 0
}

export const nextValue = (cell: ICell, table: ICell[][]): 0 | 1 => {
  if (cell?.value === 1) {
    return existingNext(cell, table)
  } else {
    return nonExistingNext(cell, table)
  }
}