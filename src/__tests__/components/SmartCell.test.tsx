import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SmartCell from "@/components/SmartCell";
import type { CellValue, ICell } from "@/pages/SmartBoard";
import { useBoundStore } from "@/store/useBoundStore";

describe("testing a Cell", () => {
  const renderCell = (rowIndex: number, columnIndex: number) => {
    return render(<SmartCell rowIndex={rowIndex} columnIndex={columnIndex} />);
  };

  const boardSize = 24;
  const initialStoreState = useBoundStore.getState();
  const initboard: ICell[][] = Array.from({ length: boardSize }, (_, r) =>
    Array.from(
      { length: boardSize },
      (_, c) =>
        ({
          row: r,
          col: c,
          value: 0,
        }) satisfies ICell,
    ),
  );
  beforeAll(() => {
    useBoundStore.setState(
      {
        ...initialStoreState,
        board: initboard,
        columns: boardSize,
        rows: boardSize,
        initialized: true,
      },
      true,
    );
  });

  test("should render disabled empty cell", () => {
    renderCell(2, 3);
    const cell = screen.getByRole("button");
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveClass("cell-button");
    const attributeValue = cell.getAttribute("data-state");
    expect(attributeValue).toBe("-1");
  });

  test("should render writable empty cell", () => {
    renderCell(6, 6);
    const cell = screen.getByRole("button");
    expect(cell).toBeInTheDocument();
    expect(cell).toHaveClass("cell-button");
    const attributeValue = cell.getAttribute("data-state");
    expect(attributeValue).toBe("0");
  });

  test("should render written cell", () => {
    initboard[6][6].value = 1;
    renderCell(6, 6);
    const cell = screen.getByRole("button");
    expect(cell).toHaveClass("cell-button");
    const attributeValue = cell.getAttribute("data-state");
    expect(attributeValue).toBe("1");
  });
});
