import { render, screen } from '@testing-library/react';
import Cell from '../../components/Cell';
import { BoardContext } from '../../BoardContext';


const cellBoardContext = {started: false}

function renderCell(cellContext, value, handleSetBoard, drawable) {
  return render(
    <div data-testid='container'>
      <BoardContext.Provider value={cellContext}>
        <Cell
            handleSetBoard={handleSetBoard}
            value={value}
            drawable={drawable}
        />
      </BoardContext.Provider>
    </div>
  );
}

const handleSetBoard = () => {console.log('setBoard')};

test('renders cell out of drawer canvas', () => {
  renderCell(cellBoardContext, 0, handleSetBoard, false)
  expect(screen.getByRole('button')).toBeDisabled()
})

test('renders an empty cell inside drawer canvas', () => {
  renderCell(cellBoardContext, 0, handleSetBoard, true)
  expect(screen.getByRole('button')).not.toBeDisabled()
  expect(screen.getByTestId('container').getElementsByClassName('cell-button selected').length).toBe(0);
})

test('renders a cell with value=1 inside drawer canvas', () => {
  renderCell(cellBoardContext, 1, handleSetBoard, true)
  expect(screen.getByTestId('container').getElementsByClassName('cell-button selected').length).toBe(1);
})