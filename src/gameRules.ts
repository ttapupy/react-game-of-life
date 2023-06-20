import { ICell } from './pages/Board';

const adjacent = (ref: ICell, other: ICell): boolean => {
  return (ref.col !== other.col || ref.row !== other.row)
}


export const adjacentValues = (cell: ICell, table: ICell[][]): number => {
  const flattenedSlice = [];
  const { row, col } = cell;
  const rowMin = Math.max(row - 1, 0)
  const rowMax = Math.min(row + 1, table.length - 1)
  const colMin = Math.max(col - 1, 0)
  const colMax = Math.min(col + 1, table[0]?.length - 1)
  for (let r = rowMin; r <= rowMax; r++) {
    const current = table[r];
    for (let c = colMin; c <= colMax; c++)
      flattenedSlice.push(current[c]);
  }
  const adjacents = flattenedSlice.filter(tc => adjacent(tc, cell))
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