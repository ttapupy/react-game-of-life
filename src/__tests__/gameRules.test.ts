import { adjacentValues } from "../gameRules";

const table = [
  [{row: 0, col: 0, value: 0}, {row: 0, col: 1, value: 0}, {row: 0, col: 2, value: 0}],
  [{row: 1, col: 0, value: 0}, {row: 1, col: 1, value: 1}, {row: 1, col: 2, value: 0}],
  [{row: 2, col: 0, value: 0}, {row: 2, col: 1, value: 0}, {row: 2, col: 2, value: 0}],
]

test('adjacentValues: cell has no filled adjacents', () => {
  const result = adjacentValues({row: 1, col: 1, value: 1}, table)
  expect(result).toBe(0)
})

test('adjacentValues: cell has one filled adjacent', () => {
  const result = adjacentValues({row: 0, col: 0, value: 0}, table)
  expect(result).toBe(1)
})