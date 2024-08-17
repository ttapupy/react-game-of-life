import { useCallback } from "react";
import { FC } from 'react';
import { CellValue, ICell } from '../pages/Board';
import { useBoardContext } from '../BoardContext';


export interface ICellProps {
  drawable: boolean;
  handleSetBoard: () => void;
  classNames: string;
  value: CellValue;
  cell: ICell;
}

const Cell: FC<ICellProps> = ({drawable, handleSetBoard, classNames, value, cell}) => {
  const {started}: { started: boolean } = useBoardContext();
  if (cell.row == 1 && cell.col == 1) {
    console.log("cellácska")

  }

  const selectCell = useCallback((pressure = 0, pressEvent = null) => {
    if (!started && drawable && pressure > 0) {
      handleSetBoard()
    }

    if (pressEvent) {
      pressEvent.target.releasePointerCapture(pressEvent.pointerId)
    }
  }, [drawable, handleSetBoard, started])

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