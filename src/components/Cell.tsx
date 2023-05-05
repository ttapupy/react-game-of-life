import React, { useState, useEffect } from 'react';
import { ICell } from '../gameRules.js'

export interface ICellProps {
  // disabled?: boolean;
  pressed: boolean;
  cell: ICell;
  setCell: React.Dispatch<React.SetStateAction<ICell>>;
}

const Cell: React.FC<ICellProps> = ({ pressed, cell, setCell }) => {
  const [ownValue, setOwnValue] = useState(() => cell?.value)

  const selectCell = (justPressed = false) => {
    if (pressed || justPressed) {
      const newVal = ownValue === 0 ? 1 : 0
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