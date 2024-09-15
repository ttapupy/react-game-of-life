import { FC, useCallback, useMemo } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { drawSize } from "@/constants";
import { isInDrawer } from "@/drawer";
import { makeSelectCellByPosition } from "@/store/boardSlice";
import { writeBoard } from "@/store/boardSlice";
import type { RootState } from "@/store/store";

export interface ISmartCellProps {
  rowIndex: number;
  columnIndex: number;
}

const SmartCell: FC<ISmartCellProps> = ({ rowIndex, columnIndex }) => {
  const selectCurrentCell = useCallback(makeSelectCellByPosition(), []);
  const currentCell = useSelector(
    (state: RootState) => selectCurrentCell(state.board, { row: rowIndex, column: columnIndex }),
    shallowEqual,
  );
  const { row, col, value } = currentCell ?? { row: null, cell: null, value: -1 };
  const started = useSelector((state: RootState) => state.game.started);
  const active = useSelector((state: RootState) => state.game.active);
  const columns = useSelector((state: RootState) => state.game.columns);
  const rows = useSelector((state: RootState) => state.game.rows);
  const dispatch = useDispatch();

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
        dispatch(writeBoard({ row: row, column: col }));
      }
      if (pressEvent) {
        pressEvent.currentTarget.releasePointerCapture(pressEvent.pointerId);
      }
    },
    [started, isDrawable, row, col],
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
