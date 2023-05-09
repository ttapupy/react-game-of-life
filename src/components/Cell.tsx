import React, { useState, useEffect } from 'react';
import { ICell, CellValue } from '../pages/Board.tsx'
import { useBoardContext, BoardAction, BoardActionKind } from '../BoardContext.tsx';
import { isInDrawer } from '../drawer.ts';

export interface ICellProps {
  row: number;
  column: number;
}

const Cell: React.FC<ICellProps> = ({ row, column }) => {

  const { board, setBoard, active, rows, columns, drawSize }: { board: ICell, setBoard: React.Dispatch<BoardAction>, drawSize: number, active: boolean, rows: number, columns: number } = useBoardContext()

  const value = board?.[row]?.[column] ? board[row][column]['value'] : null
  const [drawable, setDrawable] = useState(false)


  useEffect(() => {
    if (!active) {
      setDrawable(() => isInDrawer({ drawSize, side: rows, index: row }) && isInDrawer({ drawSize, side: columns, index: column }))
    } else {
      setDrawable(true)
    }
  }, [active, column, columns, row, rows, drawSize])

  const selectCell = (pressure = 0) => {
    if (drawable && pressure > 0) {
      const newVal = value === 0 ? 1 : 0
      setBoard({ type: BoardActionKind.WRITE, payload: { row, column, value: newVal } })
    }
  }


  return (
    <>
      {value != null &&
        <button
          disabled={!drawable}
          className={`${!drawable ? 'cell-button non-drawable' : value === CellValue.ONE ? 'cell-button selected' : 'cell-button'}`}
          onPointerDown={e => selectCell(e?.pressure)}
          onPointerEnter={e => selectCell(e?.pressure)}
        />}
    </>
  );
}

export default Cell;