import React, { useState, useEffect } from 'react';
import { ICell, CellValue } from '../pages/Board.tsx'
import { BoardAction, BoardActionKind } from '../BoardProvider.tsx';
import { isInDrawer } from '../drawer.ts';
import { useBoardContext } from '../BoardContext.ts';

export interface ICellProps {
  row: number;
  column: number;
}

const Cell: React.FC<ICellProps> = ({ row, column }) => {

  const { board, setBoard, active, started, rows, columns, drawSize, loaded }: { board: ICell, setBoard: React.Dispatch<BoardAction>, drawSize: number, active: boolean, started: boolean, rows: number, columns: number, loaded: boolean } = useBoardContext()

  const value = board?.[row]?.[column] ? board[row][column]['value'] : null
  const [drawable, setDrawable] = useState(true)


  useEffect(() => {

    if (!active && !loaded) {
      setDrawable(() => isInDrawer({ drawSize, side: rows, index: row }) && isInDrawer({ drawSize, side: columns, index: column }))
    } else {
      setDrawable(true)
    }
  }, [active, column, columns, row, rows, drawSize, loaded])

  const selectCell = (pressure = 0) => {
    if (!started && drawable && pressure > 0) {
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