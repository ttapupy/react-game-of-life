import { FC } from 'react';
import { CellValue } from '../pages/Board';
import { useBoardContext } from '../BoardContext';


export interface ICellProps {
  drawable: boolean;
  handleSetBoard: () => void;
  classNames: string;
  value: CellValue;
}

const Cell: FC<ICellProps> = ({ drawable, handleSetBoard, classNames, value }) => {
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
        data-state={`${drawable ? value : -1}`}
        disabled={!drawable}
        className={classNames}
        onPointerDown={(e) => selectCell(e.pressure, e)}
        onPointerEnter={(e) => selectCell(e.pressure)}
      />
    </>
  );
}

export default Cell;