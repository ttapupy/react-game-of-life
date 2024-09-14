import { FC, useCallback, useMemo } from "react";
import { isMobile } from "react-device-detect";
import { useShallow } from "zustand/react/shallow";
import { drawSize } from "@/constants";
import { isInDrawer } from "@/drawer";
import { writeBoard } from "@/store/BoardSlice";
import { useBoundStore } from "@/store/useBoundStore";

export interface ISmartCellProps {
  rowIndex: number;
  columnIndex: number;
}

const SmartCell: FC<ISmartCellProps> = ({ rowIndex, columnIndex }) => {
  const cell = useBoundStore(useShallow((state) => state.getCell(rowIndex, columnIndex)) || null);
  const { row, col, value } = cell ?? { row: null, cell: null, value: -1 };
  const started = useBoundStore((state) => state.started);
  const active = useBoundStore((state) => state.active);
  const columns = useBoundStore((state) => state.columns);
  const rows = useBoundStore((state) => state.rows);
  const setBoard = useBoundStore(useShallow((state) => state.dispatchBoard));

  const whatIsClass = useMemo(() => {
    let className = "cell-button";
    if (!row || !col) {
      return className;
    }
    if (row === 0 && col + 1 === columns) {
      className = `${className} top-right-cell`;
    } else if (col === 0 && row + 1 === rows) {
      className = `${className} bottom-left-cell`;
    }
    return className;
  }, [columns, rows, row, col]);

  const isDrawable = useMemo(() => {
    if (rows == null || columns == null) {
      return false;
    }

    if (!active) {
      return (
        isInDrawer({ drawSize, side: rows, index: rowIndex }) &&
        isInDrawer({
          drawSize,
          side: columns,
          index: columnIndex,
        })
      );
    }
    return true;
  }, [active, rows, columns, rowIndex, columnIndex]);

  const selectCell = useCallback(
    (pressure = 0, pressEvent: React.PointerEvent | null = null) => {
      if (row && col && !started && isDrawable && pressure > 0) {
        writeBoard(setBoard, { row: row, column: col });
      }
      if (pressEvent) {
        pressEvent.currentTarget.releasePointerCapture(pressEvent.pointerId);
      }
    },
    [started, isDrawable, setBoard, row, col],
  );

  if (row == null || col == null) {
    return null;
  }

  return (
    <>
      <button
        data-state={`${isDrawable ? value : -1}`}
        disabled={!isDrawable}
        className={whatIsClass}
        onPointerDown={(e) => {
          selectCell(isMobile ? 0 : e.pressure, e);
        }}
        onPointerEnter={(e) => {
          if (e.pressure) {
            selectCell(e.pressure);
          }
        }}
      />
    </>
  );
};

export default SmartCell;
