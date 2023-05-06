import React, { useState, useEffect } from 'react';
import { ICell } from '../pages/Board.tsx'
import { useBoardContext, BoardAction, BoardActionKind } from '../BoardContext.tsx';

export interface ICellProps {
  pressed: boolean;
  cell: ICell;
}

const Cell: React.FC<ICellProps> = ({ pressed, cell }) => {
  const [ownValue, setOwnValue] = useState(() => cell?.value)
  const { setBoard }: { setBoard: React.Dispatch<BoardAction> } = useBoardContext()

  useEffect(() => {
    setOwnValue(() => cell?.value)
  }, [cell])

  const selectCell = (justPressed = false) => {
    if (pressed || justPressed) {
      const newVal = cell?.value === 0 ? 1 : 0
      setOwnValue(newVal)
      setBoard({ type: BoardActionKind.WRITE, payload: { row: cell['row'], column: cell['col'], value: newVal } })
    }
  }


  return (
    <>
      <button
        className={`${ownValue ? 'cell-button selected' : 'cell-button'}`}
        onMouseDown={() => selectCell(true)}
        onMouseEnter={() => selectCell()}

      />
    </>
  );
}

export default Cell;