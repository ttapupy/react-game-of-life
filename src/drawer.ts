import { ICell } from "./pages/Board"


export const isInDrawer = ({ drawSize, side, index }: { drawSize: number, side: number, index: number }) => {
  const margin = (side - drawSize) / 2

  if (index < margin || index >= side - margin) {
    return false
  }

  return true
}


export const calcDrawer = ({ table, rows, columns, drawSize }: { table: ICell[][], rows: number, columns: number, drawSize: number }) => {

  const sorok = table.filter((_, rowIndex) => isInDrawer({ drawSize, side: rows, index: rowIndex }))

  return sorok.map(sor => sor.filter((_, columnIndex) => {
    return (
      isInDrawer({ drawSize, side: columns, index: columnIndex })
    )
  }))

}