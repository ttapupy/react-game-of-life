// !This component is not used, its kept for reference purposes only!
import { useCallback } from "react";
import { FC } from 'react';
import { CellValue } from '../pages/_Board';
import { useBoardContext } from '../BoardContext';


export interface ICellProps {
  drawable: boolean;
  handleSetBoard: () => void;
  classNames: string;
  value: CellValue;
}

const Cell: FC<ICellProps> = ({ drawable, handleSetBoard, classNames, value }) => {
  const { started }: { started: boolean } = useBoardContext();

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