import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import { drawSize } from "@/constants";
import { isInDrawer } from "@/drawer";
import { adjacentValues, survive } from "@/gameRules";
import type { CellValue, ICell } from "@/pages/SmartBoard";

export type Payload = {
  width?: number | null;
  height?: number | null;
  column?: number;
  row?: number;
  value?: CellValue;
  boardToLoad?: number[][];
};

export type BoardType = { board: ICell[][] | null; previousEqual: boolean };

const initialState = { board: null, previousEqual: false } as BoardType;

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initBoard: (state, action: PayloadAction<Payload>) => {
      const { height, width } = action.payload;
      state.board = Array.from({ length: height || 0 }, (_, r) =>
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
      state.previousEqual = false;
    },
    loadBoard: (state, action: PayloadAction<WithRequired<Payload, "boardToLoad">>) => {
      const { boardToLoad, height, width } = action.payload;
      state.board = Array.from({ length: height || 0 }, (_, r) =>
        Array.from({ length: width || 0 }, (_, c) => {
          const currentValue =
            isInDrawer({ drawSize, side: height || 0, index: r }) &&
            isInDrawer({ drawSize, side: width || 0, index: c })
              ? boardToLoad[r - ((height || 0) - drawSize) / 2][c - ((width || 0) - drawSize) / 2]
              : 0;

          return { row: r, col: c, value: currentValue } as ICell;
        }),
      );
      state.previousEqual = false;
    },
    writeBoard: (state, action: PayloadAction<WithRequired<Payload, "row" | "column">>) => {
      const { row, column } = action.payload;
      if (state.board && row != null && column != null) {
        state.board[row][column].value = state.board[row][column]?.value === 0 ? 1 : 0;
      }
      state.previousEqual = false;
    },
    stepBoard: (state) => {
      if (!state.board) return;

      const newBoard = state.board.map((row) =>
        row.map((cell) => {
          const neighbors = adjacentValues(cell, state.board!);
          const newValue = survive(cell, neighbors) ? 1 : 0;

          if (newValue === cell.value) {
            return cell;
          }

          return {
            ...cell,
            value: newValue as 0 | 1,
          };
        }),
      );

      state.previousEqual = state.board.every((row, r) =>
        row.every((cell, c) => cell.value === newBoard[r][c].value),
      );

      state.board = newBoard;
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

const sumBoardValues = (board: ICell[][] | null) => {
  return (
    board?.reduce((acc, row) => {
      return acc + row.reduce((acc, cell) => acc + cell.value, 0);
    }, 0) || 0
  );
};

export const sumBoard = createSelector([(state) => state.board], (board: ICell[][] | null) => {
  return sumBoardValues(board);
});

export const bordHasValueBool = createSelector(
  [(state) => state.board],
  (board: ICell[][] | null) => {
    return sumBoardValues(board) > 0;
  },
);

export const { initBoard, loadBoard, stepBoard, writeBoard } = boardSlice.actions;
export default boardSlice.reducer;
