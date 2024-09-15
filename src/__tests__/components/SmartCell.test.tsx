import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SmartCell from "@/components/SmartCell";
import type { CellValue, ICell } from "@/pages/SmartBoard";
import { store as appStore } from "@/store/store";
import { renderWithStore } from "@/utils/test-utils";

const boardSize = 24;

const initBoard: ICell[][] = Array.from({ length: boardSize }, (_, r) =>
  Array.from(
    { length: boardSize },
    (_, c) =>
      ({
        row: r,
        col: c,
        value: 0 as CellValue,
      }) satisfies ICell,
  ),
);
let testStore = appStore.getState();
testStore = {
  ...testStore,
  board: { board: initBoard, previousEqual: false },
  game: {
    ...testStore.game,
    columns: boardSize,
    rows: boardSize,
    initialized: true,
  },
};

describe("testing a Cell", () => {
  test("should render disabled empty cell", () => {
    renderWithStore(<SmartCell rowIndex={2} columnIndex={3} />, {
      preloadedState: testStore,
    });
    const cell = screen.getByRole("button");
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveClass("cell-button");
    const attributeValue = cell.getAttribute("data-state");
    expect(attributeValue).toBe("-1");
  });

  test("should render writable empty cell", () => {
    renderWithStore(<SmartCell rowIndex={6} columnIndex={6} />, {
      preloadedState: testStore,
    });

    const cell = screen.getByRole("button");
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveClass("cell-button");
    const attributeValue = cell.getAttribute("data-state");
    expect(attributeValue).toBe("0");
  });

  test("should render written cell", () => {
    initBoard[6][6].value = 1;
    testStore.board.board = initBoard;
    renderWithStore(<SmartCell rowIndex={6} columnIndex={6} />, {
      preloadedState: testStore,
    });
    const cell = screen.getByRole("button");
    expect(cell).toHaveClass("cell-button");
    const attributeValue = cell.getAttribute("data-state");
    expect(attributeValue).toBe("1");
  });
});
