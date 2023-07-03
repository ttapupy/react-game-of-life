import { ICell } from "./pages/Board"
import { CellValue } from "./pages/Board"

// Returns whether an element index is inside drawer canvas
export const isInDrawer = ({ drawSize, side, index }: { drawSize: number, side: number, index: number }) => {
  const margin = (side - drawSize) / 2
  if (index < margin || index >= side - margin) {
    return false
  }

  return true
}


export const calcDrawer = ({ table, rows, columns, drawSize }: { table: ICell[][], rows: number, columns: number, drawSize: number }): CellValue[][] => {
  const tableRows = table.filter((_, rowIndex) => isInDrawer({ drawSize, side: rows, index: rowIndex }))

  return tableRows.map(tableRow => tableRow.filter((_, columnIndex) => {
    return (
      isInDrawer({ drawSize, side: columns, index: columnIndex })
    )
  }).map(cell => cell['value']))

}