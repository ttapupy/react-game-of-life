import { Dispatch, FC, useCallback, useMemo } from "react";
import { BoardAction, useBoardContext, writeBoard } from '../BoardContext';
import { ICell } from "../pages/SmartBoard.tsx";
import { isInDrawer } from "../drawer.ts";


export interface ISmartCellProps {
  rowIndex: number;
  columnIndex: number;
}

const SmartCell: FC<ISmartCellProps> = ({rowIndex, columnIndex}) => {
  const {board, setBoard, started, active, rows, columns, drawSize}: {
    board: ICell[][],
    setBoard: Dispatch<BoardAction>,
    started: boolean,
    active: boolean,
    rows: number,
    columns: number,
    drawSize: number,
  } = useBoardContext()

  const {row, col, value} = useMemo(() => board[rowIndex][columnIndex], [board, rowIndex, columnIndex])

  if (row == 1 && col == 1) {
    console.log("okos cellácska", value)

  }

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
      return isInDrawer({drawSize, side: rows, index: rowIndex}) && isInDrawer({
        drawSize,
        side: columns,
        index: columnIndex
      })
    }
    return true;
  }, [active, drawSize, rows, columns])

  const selectCell = useCallback((pressure = 0, pressEvent = null) => {
    if (!started && isDrawable && pressure > 0) {
      writeBoard(setBoard, {row, column: col})
    }
    if (pressEvent) {
      pressEvent.target.releasePointerCapture(pressEvent.pointerId)
    }
  }, [isDrawable, started])

  if (!board?.length || !board[0].length ) {
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