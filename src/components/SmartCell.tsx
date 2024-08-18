import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { writeBoard } from "../store/BoardSlice";
import { isInDrawer } from "../drawer";
import { useBoundStore } from '../store/useBoundStore'
import { drawSize } from "../constants";
import { CellValue } from "../pages/Board";


export interface ISmartCellProps {
  rowIndex: number;
  columnIndex: number;
}

const SmartCell: FC<ISmartCellProps> = ({ rowIndex, columnIndex }) => {
  const [cell, setCell] = useState({ row: 0, col: 0, value: CellValue.NONE })
  const { row, col, value } = cell;
  const { active, started, columns, rows } = useBoundStore(state => state)
  const setBoard = useBoundStore(state => state.dispatchBoard)

  const unsub = useBoundStore.subscribe(
    state => {
      if (state.board?.[rowIndex] != null && state.board[rowIndex][columnIndex] != null) {
        return state.board[rowIndex][columnIndex]
      }
      return { row: 0, col: 0, value: CellValue.NONE }
    } ,
    (state) => {
      setCell(state)
    },
  )

  useEffect(()=> {
    return () => unsub();
  }, [unsub]);

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
  }, [row, col, active, rows, columns, rowIndex, columnIndex])

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
        data-state={`${isDrawable ? value : -1}`}
        disabled={!isDrawable}
        className={whatIsClass}
        onPointerDown={(e) => selectCell(e.pressure, e)}
        onPointerEnter={(e) => selectCell(e.pressure)}
      />
    </>
  )
}

export default SmartCell;