import { FC, useCallback, useMemo } from "react";
import { writeBoard } from "../store/BoardSlice";
import { isInDrawer } from "../drawer";
import { useBoundStore } from '../store/useBoundStore'
import { drawSize } from "../constants";
import { CellValue } from "../pages/SmartBoard";
import { useShallow } from "zustand/react/shallow";


export interface ISmartCellProps {
  rowIndex: number;
  columnIndex: number;
}

const SmartCell: FC<ISmartCellProps> = ({ rowIndex, columnIndex }) => {
  const { row, col, value } = useBoundStore(useShallow(state => state.getCell(rowIndex, columnIndex)));
  const started = useBoundStore(state => state.started)
  const active = useBoundStore(state => state.active)
  const columns = useBoundStore(state => state.columns)
  const rows = useBoundStore(state => state.rows)
  const setBoard = useBoundStore(useShallow(state => state.dispatchBoard))

  const whatIsClass = useMemo(() => {
    let className = 'cell-button'
    if (row === 0 && col + 1 === columns) {
      className = `${className} top-right-cell`
    } else if (col === 0 && row + 1 === rows) {
      className = `${className} bottom-left-cell`
    }
    return className
  }, [columns, rows, row, col])

  const isDrawable = useMemo(() => {

    if (!active) {
      return isInDrawer({ drawSize, side: rows, index: rowIndex }) && isInDrawer({
        drawSize,
        side: columns,
        index: columnIndex
      })
    }
    return true;
  }, [active, rows, columns, rowIndex, columnIndex])

  const selectCell = useCallback((pressure = 0, pressEvent = null) => {
    if (!started && isDrawable && pressure > 0) {
      writeBoard(setBoard, { row: row, column: col })
    }
    if (pressEvent) {
      pressEvent.target.releasePointerCapture(pressEvent.pointerId)
    }
  }, [started, isDrawable, setBoard, row, col])

  if (row == null || col == null) {
    return null
  }


  return (
    <>
      <button
        data-state={`${isDrawable ? value : CellValue.NONE}`}
        disabled={!isDrawable}
        className={whatIsClass}
        onPointerDown={(e) => selectCell(e.pressure, e)}
        onPointerEnter={(e) => selectCell(e.pressure)}
      />
    </>
  )
}

export default SmartCell;