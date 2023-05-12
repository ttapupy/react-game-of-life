import { render, screen } from '@testing-library/react';
import Cell from '../Cell.tsx';
import { BoardContext } from '../../BoardContext.ts';

// 10rows * 15cells; row i7-cell i7 value:1, other values:0
const board = [
  [
    {
      "row": 0,
      "col": 0,
      "value": 0
    },
    {
      "row": 0,
      "col": 1,
      "value": 0
    },
    {
      "row": 0,
      "col": 2,
      "value": 0
    },
    {
      "row": 0,
      "col": 3,
      "value": 0
    },
    {
      "row": 0,
      "col": 4,
      "value": 0
    },
    {
      "row": 0,
      "col": 5,
      "value": 0
    },
    {
      "row": 0,
      "col": 6,
      "value": 0
    },
    {
      "row": 0,
      "col": 7,
      "value": 0
    },
    {
      "row": 0,
      "col": 8,
      "value": 0
    },
    {
      "row": 0,
      "col": 9,
      "value": 0
    },
    {
      "row": 0,
      "col": 10,
      "value": 0
    },
    {
      "row": 0,
      "col": 11,
      "value": 0
    },
    {
      "row": 0,
      "col": 12,
      "value": 0
    },
    {
      "row": 0,
      "col": 13,
      "value": 0
    },
    {
      "row": 0,
      "col": 14,
      "value": 0
    }
  ],
  [
    {
      "row": 1,
      "col": 0,
      "value": 0
    },
    {
      "row": 1,
      "col": 1,
      "value": 0
    },
    {
      "row": 1,
      "col": 2,
      "value": 0
    },
    {
      "row": 1,
      "col": 3,
      "value": 0
    },
    {
      "row": 1,
      "col": 4,
      "value": 0
    },
    {
      "row": 1,
      "col": 5,
      "value": 0
    },
    {
      "row": 1,
      "col": 6,
      "value": 0
    },
    {
      "row": 1,
      "col": 7,
      "value": 0
    },
    {
      "row": 1,
      "col": 8,
      "value": 0
    },
    {
      "row": 1,
      "col": 9,
      "value": 0
    },
    {
      "row": 1,
      "col": 10,
      "value": 0
    },
    {
      "row": 1,
      "col": 11,
      "value": 0
    },
    {
      "row": 1,
      "col": 12,
      "value": 0
    },
    {
      "row": 1,
      "col": 13,
      "value": 0
    },
    {
      "row": 1,
      "col": 14,
      "value": 0
    }
  ],
  [
    {
      "row": 2,
      "col": 0,
      "value": 0
    },
    {
      "row": 2,
      "col": 1,
      "value": 0
    },
    {
      "row": 2,
      "col": 2,
      "value": 0
    },
    {
      "row": 2,
      "col": 3,
      "value": 0
    },
    {
      "row": 2,
      "col": 4,
      "value": 0
    },
    {
      "row": 2,
      "col": 5,
      "value": 0
    },
    {
      "row": 2,
      "col": 6,
      "value": 0
    },
    {
      "row": 2,
      "col": 7,
      "value": 0
    },
    {
      "row": 2,
      "col": 8,
      "value": 0
    },
    {
      "row": 2,
      "col": 9,
      "value": 0
    },
    {
      "row": 2,
      "col": 10,
      "value": 0
    },
    {
      "row": 2,
      "col": 11,
      "value": 0
    },
    {
      "row": 2,
      "col": 12,
      "value": 0
    },
    {
      "row": 2,
      "col": 13,
      "value": 0
    },
    {
      "row": 2,
      "col": 14,
      "value": 0
    }
  ],
  [
    {
      "row": 3,
      "col": 0,
      "value": 0
    },
    {
      "row": 3,
      "col": 1,
      "value": 0
    },
    {
      "row": 3,
      "col": 2,
      "value": 0
    },
    {
      "row": 3,
      "col": 3,
      "value": 0
    },
    {
      "row": 3,
      "col": 4,
      "value": 0
    },
    {
      "row": 3,
      "col": 5,
      "value": 0
    },
    {
      "row": 3,
      "col": 6,
      "value": 0
    },
    {
      "row": 3,
      "col": 7,
      "value": 0
    },
    {
      "row": 3,
      "col": 8,
      "value": 0
    },
    {
      "row": 3,
      "col": 9,
      "value": 0
    },
    {
      "row": 3,
      "col": 10,
      "value": 0
    },
    {
      "row": 3,
      "col": 11,
      "value": 0
    },
    {
      "row": 3,
      "col": 12,
      "value": 0
    },
    {
      "row": 3,
      "col": 13,
      "value": 0
    },
    {
      "row": 3,
      "col": 14,
      "value": 0
    }
  ],
  [
    {
      "row": 4,
      "col": 0,
      "value": 0
    },
    {
      "row": 4,
      "col": 1,
      "value": 0
    },
    {
      "row": 4,
      "col": 2,
      "value": 0
    },
    {
      "row": 4,
      "col": 3,
      "value": 0
    },
    {
      "row": 4,
      "col": 4,
      "value": 0
    },
    {
      "row": 4,
      "col": 5,
      "value": 0
    },
    {
      "row": 4,
      "col": 6,
      "value": 0
    },
    {
      "row": 4,
      "col": 7,
      "value": 0
    },
    {
      "row": 4,
      "col": 8,
      "value": 0
    },
    {
      "row": 4,
      "col": 9,
      "value": 0
    },
    {
      "row": 4,
      "col": 10,
      "value": 0
    },
    {
      "row": 4,
      "col": 11,
      "value": 0
    },
    {
      "row": 4,
      "col": 12,
      "value": 0
    },
    {
      "row": 4,
      "col": 13,
      "value": 0
    },
    {
      "row": 4,
      "col": 14,
      "value": 0
    }
  ],
  [
    {
      "row": 5,
      "col": 0,
      "value": 0
    },
    {
      "row": 5,
      "col": 1,
      "value": 0
    },
    {
      "row": 5,
      "col": 2,
      "value": 0
    },
    {
      "row": 5,
      "col": 3,
      "value": 0
    },
    {
      "row": 5,
      "col": 4,
      "value": 0
    },
    {
      "row": 5,
      "col": 5,
      "value": 0
    },
    {
      "row": 5,
      "col": 6,
      "value": 0
    },
    {
      "row": 5,
      "col": 7,
      "value": 0
    },
    {
      "row": 5,
      "col": 8,
      "value": 0
    },
    {
      "row": 5,
      "col": 9,
      "value": 0
    },
    {
      "row": 5,
      "col": 10,
      "value": 0
    },
    {
      "row": 5,
      "col": 11,
      "value": 0
    },
    {
      "row": 5,
      "col": 12,
      "value": 0
    },
    {
      "row": 5,
      "col": 13,
      "value": 0
    },
    {
      "row": 5,
      "col": 14,
      "value": 0
    }
  ],
  [
    {
      "row": 6,
      "col": 0,
      "value": 0
    },
    {
      "row": 6,
      "col": 1,
      "value": 0
    },
    {
      "row": 6,
      "col": 2,
      "value": 0
    },
    {
      "row": 6,
      "col": 3,
      "value": 0
    },
    {
      "row": 6,
      "col": 4,
      "value": 0
    },
    {
      "row": 6,
      "col": 5,
      "value": 0
    },
    {
      "row": 6,
      "col": 6,
      "value": 0
    },
    {
      "row": 6,
      "col": 7,
      "value": 0
    },
    {
      "row": 6,
      "col": 8,
      "value": 0
    },
    {
      "row": 6,
      "col": 9,
      "value": 0
    },
    {
      "row": 6,
      "col": 10,
      "value": 0
    },
    {
      "row": 6,
      "col": 11,
      "value": 0
    },
    {
      "row": 6,
      "col": 12,
      "value": 0
    },
    {
      "row": 6,
      "col": 13,
      "value": 0
    },
    {
      "row": 6,
      "col": 14,
      "value": 0
    }
  ],
  [
    {
      "row": 7,
      "col": 0,
      "value": 0
    },
    {
      "row": 7,
      "col": 1,
      "value": 0
    },
    {
      "row": 7,
      "col": 2,
      "value": 0
    },
    {
      "row": 7,
      "col": 3,
      "value": 0
    },
    {
      "row": 7,
      "col": 4,
      "value": 0
    },
    {
      "row": 7,
      "col": 5,
      "value": 0
    },
    {
      "row": 7,
      "col": 6,
      "value": 0
    },
    {
      "row": 7,
      "col": 7,
      "value": 1
    },
    {
      "row": 7,
      "col": 8,
      "value": 0
    },
    {
      "row": 7,
      "col": 9,
      "value": 0
    },
    {
      "row": 7,
      "col": 10,
      "value": 0
    },
    {
      "row": 7,
      "col": 11,
      "value": 0
    },
    {
      "row": 7,
      "col": 12,
      "value": 0
    },
    {
      "row": 7,
      "col": 13,
      "value": 0
    },
    {
      "row": 7,
      "col": 14,
      "value": 0
    }
  ],
  [
    {
      "row": 8,
      "col": 0,
      "value": 0
    },
    {
      "row": 8,
      "col": 1,
      "value": 0
    },
    {
      "row": 8,
      "col": 2,
      "value": 0
    },
    {
      "row": 8,
      "col": 3,
      "value": 0
    },
    {
      "row": 8,
      "col": 4,
      "value": 0
    },
    {
      "row": 8,
      "col": 5,
      "value": 0
    },
    {
      "row": 8,
      "col": 6,
      "value": 0
    },
    {
      "row": 8,
      "col": 7,
      "value": 0
    },
    {
      "row": 8,
      "col": 8,
      "value": 0
    },
    {
      "row": 8,
      "col": 9,
      "value": 0
    },
    {
      "row": 8,
      "col": 10,
      "value": 0
    },
    {
      "row": 8,
      "col": 11,
      "value": 0
    },
    {
      "row": 8,
      "col": 12,
      "value": 0
    },
    {
      "row": 8,
      "col": 13,
      "value": 0
    },
    {
      "row": 8,
      "col": 14,
      "value": 0
    }
  ],
  [
    {
      "row": 9,
      "col": 0,
      "value": 0
    },
    {
      "row": 9,
      "col": 1,
      "value": 0
    },
    {
      "row": 9,
      "col": 2,
      "value": 0
    },
    {
      "row": 9,
      "col": 3,
      "value": 0
    },
    {
      "row": 9,
      "col": 4,
      "value": 0
    },
    {
      "row": 9,
      "col": 5,
      "value": 0
    },
    {
      "row": 9,
      "col": 6,
      "value": 0
    },
    {
      "row": 9,
      "col": 7,
      "value": 0
    },
    {
      "row": 9,
      "col": 8,
      "value": 0
    },
    {
      "row": 9,
      "col": 9,
      "value": 0
    },
    {
      "row": 9,
      "col": 10,
      "value": 0
    },
    {
      "row": 9,
      "col": 11,
      "value": 0
    },
    {
      "row": 9,
      "col": 12,
      "value": 0
    },
    {
      "row": 9,
      "col": 13,
      "value": 0
    },
    {
      "row": 9,
      "col": 14,
      "value": 0
    }
  ]
]

const cellBoardContext = {
  board, active: false, started: false, rows: board?.length, columns: board?.[0]?.length, drawSize: 10, loaded: false
}

function renderCell(cellContext, row, column) {
  return render(
    <div data-testid='container'>
      <BoardContext.Provider value={cellContext}>
        <Cell row={row} column={column} />
      </BoardContext.Provider>
    </div>
  );
}

test('renders cell out of drawer canvas', () => {
  renderCell(cellBoardContext, 1, 1)
  expect(screen.getByRole('button')).toBeDisabled()

})

test('renders an empty cell inside drawer canvas', () => {
  renderCell(cellBoardContext, 5, 5)
  expect(screen.getByRole('button')).not.toBeDisabled()
  expect(screen.getByTestId('container').getElementsByClassName('cell-button selected').length).toBe(0);
})

test('renders a cell with value=1 inside drawer canvas', () => {
  renderCell(cellBoardContext, 7, 7)
  expect(screen.getByTestId('container').getElementsByClassName('cell-button selected').length).toBe(1);
})