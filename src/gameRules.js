export interface ICell {
  row: number;
  col: number;
  value: 0 | 1;
}

const adjacent: boolean = (ref: ICell, other: ICell) => {
  const colAdj = Math.abs(ref.col - other.col)
  const rowAdj = Math.abs(ref.row - other.row)
  return ((colAdj + rowAdj === 1) || (colAdj === 1 && rowAdj === 1))
}


const adjacentValues: number = (cell: ICell, table: ICell[]) => {
  const adjacents = table.filter(tc => adjacent(tc, cell))
  return adjacents.reduce((prev, curr) => prev.value + curr.value, 0)
}

const existingNext: number = (cell: ICell, table: ICell[]) => {
  const env = adjacentValues(cell, table)
  if (env === 2 || env === 3) {
    return 1
  }
  return 0
}

const nonExistingNext: number = (cell: ICell, table: ICell[]) => {
  const env = adjacentValues(cell, table)
  if (env === 3) {
    return 1
  }
  return 0
}

export const nextValue: number = (cell: ICell, table: ICell[]) => {
  if (cell?.value === 1) {
    return existingNext(cell, table)
  } else {
    return nonExistingNext(cell, table)
  }
}