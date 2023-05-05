import React, { useState, useEffect } from 'react';
import { ICell } from '../pages/Board'

export interface ICellProps {
  // disabled?: boolean;
  pressed: boolean;
  cell: ICell;
  setCell: React.Dispatch<React.SetStateAction<ICell>>;
}

const Cell: React.FC<ICellProps> = ({ pressed, cell, setCell }) => {
  const [ownValue, setOwnValue] = useState(() => cell?.value)

  useEffect(() => {
    setOwnValue(() => cell?.value)
  }, [cell])

  const selectCell = (justPressed = false) => {
    if (pressed || justPressed) {
      const newVal = cell?.value === 0 ? 1 : 0
      setCell({ ...cell, value: newVal })
      setOwnValue(newVal)
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