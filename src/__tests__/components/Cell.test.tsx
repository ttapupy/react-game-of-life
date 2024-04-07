import { render, screen } from '@testing-library/react';
import Cell from '../../components/Cell';
import { BoardContext } from '../../BoardContext';

const cellBoardContext = { started: false }

function renderCell(cellContext, value, handleSetBoard, drawable) {
  return render(
    <div data-testid='container'>
      <BoardContext.Provider value={cellContext}>
        <Cell
          classNames='cell-button'
          handleSetBoard={handleSetBoard}
          value={value}
          drawable={drawable}
        />
      </BoardContext.Provider>
    </div>
  );
}

const handleSetBoard = () => { console.log('setBoard') };

test('renders cell out of drawer canvas', () => {
  const cell = { value: 0, row: 1, col: 1 }
  renderCell(cellBoardContext, cell.value, handleSetBoard, false)
  expect(screen.getByRole('button')).toBeDisabled()
})

test('renders an empty cell inside drawer canvas', () => {
  const cell = { value: 0, row: 1, col: 1 }
  renderCell(cellBoardContext, cell.value, handleSetBoard, true)
  expect(screen.getByRole('button')).not.toBeDisabled()
  expect(screen.getByTestId('container').querySelectorAll("button[data-state='1']").length).toBe(0);
})

test('renders a cell with value=1 inside drawer canvas', () => {
  const cell = { value: 1, row: 1, col: 1 }
  renderCell(cellBoardContext, cell.value, handleSetBoard, true)
  expect(screen.getByTestId('container').querySelectorAll("button[data-state='1']").length).toBe(1);
})