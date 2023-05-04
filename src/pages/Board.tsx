import React, { useEffect, useState, useRef } from 'react';
import Cell from '../components/Cell';
import useWindowDimensions from '../hooks/useWindowDimensions.js'
import { ICell } from '../gameRules.js'


interface IBoardProps {
  started: boolean;
}

const Board: React.FC<IBoardProps> = ({ started }) => {
  const [pressed, setPressed] = useState(false)
  const { width, height }: { width: number, height: number } = useWindowDimensions();
  const [columns] = useState(() => Math.floor(0.6 * width / 15))
  const [rows] = useState(() => Math.floor(height / 15))
  const [board, setBoard] = useState<ICell[][]>([[]])
  const filled = useRef(null)

  const setCell = (cell: ICell) => {
    setBoard(board => {
      board[cell?.row][cell?.col] = cell
      return board
    })
  }


  useEffect(() => {
    function handlePress() {
      setPressed(true)
    }

    function handleRelease() {
      setPressed(false)
    }

    window.addEventListener('mousedown', handlePress);
    window.addEventListener('mouseup', handleRelease);

    return () => {
      window.removeEventListener('mousedown', handlePress);
      window.removeEventListener('mouseup', handleRelease);

    };
  }, []);


  useEffect(() => {
    if (!started && !!rows && !!columns && !filled.current) {
      console.log('col', columns)
      console.log('row', rows)
      setBoard(board => {
        for (let r = 0; r < rows; r++) {
          board[r] = []
          for (let c = 0; c < columns; c++) {
            board[r][c] = { row: r, col: c, value: 0 }
          }
        }
        return board
      })
      filled.current = true;
    }
  }, [rows, columns, started])

  useEffect(() => {
    console.log('board', board)
  }, [board])

  return (
    <div
      className='board'
      style={{ gridTemplateColumns: `repeat(${columns}, 15px)`, gridTemplateRows: `repeat(${rows}, 15px)` }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      {board.map((sor: ICell[]) => {
        return (sor.map((cella: ICell) => {
          return (<Cell cell={cella} setCell={setCell} key={`${cella?.row}-${cella?.col}`} pressed={pressed} />)
        }))
      })
      }
    </div>
  );
}

export default Board;