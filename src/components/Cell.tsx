import React from 'react';
import { ICell, CellValue } from '../pages/Board.tsx'
import { useBoardContext, BoardAction, BoardActionKind } from '../BoardContext.tsx';

export interface ICellProps {
  pressed: boolean;
  row: number;
  column: number;
}

const Cell: React.FC<ICellProps> = ({ pressed, row, column }) => {
  const { board, setBoard }: { board: ICell, setBoard: React.Dispatch<BoardAction> } = useBoardContext()
  const value = board?.[row]?.[column] ? board[row][column]['value'] : null

  const selectCell = (justPressed = false) => {
    if (pressed || justPressed) {
      const newVal = value === 0 ? 1 : 0
      setBoard({ type: BoardActionKind.WRITE, payload: { row, column, value: newVal } })
    }
  }


  return (
    <>
      {value != null && <button
        className={`${value === CellValue.ONE ? 'cell-button selected' : 'cell-button'}`}
        onMouseDown={() => selectCell(true)}
        onMouseEnter={() => selectCell()}

      />}
    </>
  );
}

export default Cell;