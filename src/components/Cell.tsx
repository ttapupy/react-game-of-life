import { FC } from 'react';
import { ICell, CellValue } from '../pages/Board';
import { useBoardContext } from '../BoardContext';


export interface ICellProps {
  drawable: boolean;
  handleSetBoard: () => void;
  cell: ICell;
}

const Cell: FC<ICellProps> = ({ drawable, handleSetBoard, cell }) => {
  const { started, rows, columns }: { started: boolean, rows: number, columns: number, } = useBoardContext();
  const { value, row, col } = cell

  let className = `${!drawable ? 'cell-button non-drawable' : value === CellValue.ONE ? 'cell-button selected' : 'cell-button'}`

  if (row === 0 && col + 1 === columns) {
    className = `${className} top-right-cell`
  } else if (col === 0 && row + 1 === rows) {
    className = `${className} bottom-left-cell`
  }

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
        className={className}
        onPointerDown={(e) => selectCell(e.pressure, e)}
        onPointerEnter={(e) => selectCell(e.pressure)}
      />
    </>
  );
}

export default Cell;