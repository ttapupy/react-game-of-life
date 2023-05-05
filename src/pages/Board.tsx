import React, { useEffect, useState, useRef } from 'react';
import Cell from '../components/Cell';
import useWindowDimensions from '../hooks/useWindowDimensions.js'
import { ICell } from '../gameRules.js'
import useMousePress from '../hooks/useMousePress.js'
import Spinner from '../components/Spinner.js';


interface IBoardProps {
  started: boolean;
}

const Board: React.FC<IBoardProps> = ({ started }) => {
  const pressed = useMousePress('board')
  const { width, height }: { width: number, height: number } = useWindowDimensions();
  const [columns] = useState(() => Math.floor(0.6 * width / 15))
  const [rows] = useState(() => Math.floor(height / 15))
  const [board, setBoard] = useState<ICell[][]>([[]])
  const filled = useRef(null)

  const setCell = (cell: ICell) => {
    setBoard(board => {
      if (board[cell?.row]?.[cell?.col] != null) {
        board[cell?.row][cell?.col] = cell
      }
      return board
    })
  }

  useEffect(() => {
    if (!started && !!rows && !!columns && !filled.current) {
      filled.current = true;
      setBoard(board => {
        for (let r = 0; r < rows; r++) {
          board[r] = []
          for (let c = 0; c < columns; c++) {
            board[r][c] = { row: r, col: c, value: 0 }
          }
        }
        return board
      })
    }
  }, [rows, columns, started])

  return (
    <>

      <fieldset style={{ border: '0' }} disabled={started}>
        <div
          className='board'
          id={'board'}
        >
          {board?.length > 1 ?
            (<div className='board-container' style={{ gridTemplateColumns: `repeat(${columns}, 15px)`, gridTemplateRows: `repeat(${rows}, 15px)` }}>
              {board.map((sor: ICell[]) => {
                return (sor.map((cella: ICell) => {
                  return (<Cell cell={cella} setCell={setCell} key={`${cella?.row}-${cella?.col}`} pressed={pressed} />)
                }))
              })
              }
            </div>) :
            <Spinner />}
        </div>
      </fieldset>

    </>
  );
}

export default Board;