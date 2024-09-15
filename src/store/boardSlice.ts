import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { drawSize } from "@/constants";
import { isInDrawer } from "@/drawer";
import { nextValue } from "@/gameRules";
import type { CellValue, ICell } from "@/pages/SmartBoard";

export type Payload = {
  width?: number | null;
  height?: number | null;
  column?: number;
  row?: number;
  value?: CellValue;
  boardToLoad?: number[][];
};

export type BoardType = ICell[][] | null;

const initialState = null as BoardType;

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initBoard: (_state, action: PayloadAction<Payload>) => {
      const { height, width } = action.payload;
      return Array.from({ length: height || 0 }, (_, r) =>
        Array.from(
          { length: width || 0 },
          (_, c) =>
            ({
              row: r,
              col: c,
              value: 0,
            }) as ICell,
        ),
      );
    },
    loadBoard: (_state, action: PayloadAction<WithRequired<Payload, "boardToLoad">>) => {
      const { boardToLoad, height, width } = action.payload;
      return Array.from({ length: height || 0 }, (_, r) =>
        Array.from({ length: width || 0 }, (_, c) => {
          const currentValue =
            isInDrawer({ drawSize, side: height || 0, index: r }) &&
            isInDrawer({ drawSize, side: width || 0, index: c })
              ? boardToLoad[r - ((height || 0) - drawSize) / 2][c - ((width || 0) - drawSize) / 2]
              : 0;

          return { row: r, col: c, value: currentValue } as ICell;
        }),
      );
    },
    writeBoard: (state, action: PayloadAction<WithRequired<Payload, "row" | "column">>) => {
      const { row, column } = action.payload;
      if (state && row != null && column != null) {
        state[row][column].value = state[row][column].value === 0 ? 1 : 0;
      }
    },
    stepBoard: (state) => {
      return (
        state?.map((currentRow: ICell[]) => {
          return currentRow.map((cell: ICell) => {
            return { ...cell, value: nextValue(cell, state) };
          });
        }) || null
      );
    },
  },
});

export const makeSelectCellByPosition = () => {
  return createSelector(
    [(state) => state.board, (_state, position: { row: number; column: number }) => position],
    (board: ICell[][] | null, position: { row: number; column: number }) =>
      board?.[position.row][position.column] || null,
  );
};

export const sumBoard = createSelector([(state) => state.board], (board: ICell[][] | null) => {
  const sum: number =
    board?.reduce((acc, row) => {
      return acc + row.reduce((acc, cell) => acc + cell.value, 0);
    }, 0) || 0;
  return sum;
});

export const { initBoard, loadBoard, stepBoard, writeBoard } = boardSlice.actions;
export default boardSlice.reducer;
