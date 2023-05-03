import React, { useState, useEffect } from 'react';

export interface ICellProps {
  disabled?: boolean;
  pressed?: boolean;
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cell: React.FC<ICellProps> = ({ disabled = false, pressed = false, setPressed }) => {
  const [value, setValue] = useState(false)


  const selectCell = (justPressed = false) => {
    if (pressed || justPressed) {
      setValue(!value)
    }
  }

  // useEffect(() => {
  //   console.log('pressed', pressed)
  // }, [pressed])

  return (
    <>
      <button
        className={`${value ? 'cell-button selected' : 'cell-button'}`}
        onMouseDown={() => selectCell(true)}
        onMouseUp={() => setPressed(false)}
        onMouseEnter={() => selectCell()}
        disabled={disabled}
      >
        {value}
      </button>

    </>
  );
}

export default Cell;