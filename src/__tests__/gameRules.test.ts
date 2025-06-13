import { adjacentValues, survive } from "@/gameRules";
import { ICell } from "@/pages/SmartBoard";

const table = [
  [
    { row: 0, col: 0, value: 0 },
    { row: 0, col: 1, value: 0 },
    { row: 0, col: 2, value: 0 },
  ],
  [
    { row: 1, col: 0, value: 0 },
    { row: 1, col: 1, value: 0 },
    { row: 1, col: 2, value: 1 },
  ],
  [
    { row: 2, col: 0, value: 0 },
    { row: 2, col: 1, value: 1 },
    { row: 2, col: 2, value: 0 },
  ],
  [
    { row: 3, col: 0, value: 1 },
    { row: 3, col: 1, value: 0 },
    { row: 3, col: 2, value: 1 },
  ],
] satisfies ICell[][];

describe("adjacentValues", () => {
  test("adjacentValues: cell has no filled adjacents", () => {
    const result = adjacentValues(table[0][0], table);
    expect(result).toBe(0);
  });

  test("adjacentValues: cell has one filled adjacent", () => {
    const result = adjacentValues(table[0][2], table);
    expect(result).toBe(1);
  });

  test("adjacentValues: cell has two filled adjacents", () => {
    const result = adjacentValues(table[1][1], table);
    expect(result).toBe(2);
  });

  test("adjacentValues: cell has three filled adjacents", () => {
    const result = adjacentValues(table[3][1], table);
    expect(result).toBe(3);
  });
});

describe("survive", () => {
  describe("when cell is alive", () => {
    const liveCell: ICell = { row: 0, col: 0, value: 1 };

    it("should die with fewer than 2 live neighbors (underpopulation)", () => {
      expect(survive(liveCell, 0)).toBe(false);
      expect(survive(liveCell, 1)).toBe(false);
    });

    it("should survive with 2 or 3 live neighbors", () => {
      expect(survive(liveCell, 2)).toBe(true);
      expect(survive(liveCell, 3)).toBe(true);
    });

    it("should die with more than 3 live neighbors (overpopulation)", () => {
      expect(survive(liveCell, 4)).toBe(false);
      expect(survive(liveCell, 5)).toBe(false);
      expect(survive(liveCell, 8)).toBe(false);
    });
  });

  describe("when cell is dead", () => {
    const deadCell1: ICell = { row: 0, col: 0, value: 0 };
    const deadCell2: ICell = { row: 0, col: 0, value: -1 };

    it("should come to life with exactly 3 live neighbors", () => {
      expect(survive(deadCell1, 3)).toBe(true);
      expect(survive(deadCell2, 3)).toBe(true);
    });

    it("should stay dead with any number of live neighbors other than 3", () => {
      [0, 1, 2, 4, 5, 6, 7, 8].forEach((neighbors) => {
        expect(survive(deadCell1, neighbors)).toBe(false);
        expect(survive(deadCell2, neighbors)).toBe(false);
      });
    });
  });

  describe("edge cases", () => {
    it("should handle minimum and maximum possible neighbor counts", () => {
      const liveCell: ICell = { row: 0, col: 0, value: 1 };
      const deadCell: ICell = { row: 0, col: 0, value: 0 };

      expect(survive(liveCell, 0)).toBe(false);
      expect(survive(deadCell, 0)).toBe(false);

      expect(survive(liveCell, 8)).toBe(false);
      expect(survive(deadCell, 8)).toBe(false);
    });
  });
});
