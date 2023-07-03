import { FC } from 'react';
import { CellValue } from '../pages/Board';
import { useBoardContext } from '../BoardContext';

export interface ICellProps {
  drawable: boolean;
  handleSetBoard: () => void;
  value: 0 | 1;
}

const Cell: FC<ICellProps> = ({ drawable, handleSetBoard, value }) => {
  const { started }: { started: boolean } = useBoardContext();

  const selectCell = (pressure = 0, pressEvent = null) => {
    if (!started && drawable && pressure > 0) {
      handleSetBoard()
    }

    if (pressEvent) {
      pressEvent.target.releasePointerCapture(pressEvent.pointerId)
    }
  }

  return (
    <>
      <button
        disabled={!drawable}
        className={`${!drawable ? 'cell-button non-drawable' : value === CellValue.ONE ? 'cell-button selected' : 'cell-button'}`}
        onPointerDown={(e) => selectCell(e.pressure, e)}
        onPointerEnter={(e) => selectCell(e.pressure)}
      />
    </>
  );
}

export default Cell;