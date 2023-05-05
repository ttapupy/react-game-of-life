import { useEffect, useState, useRef, useContext } from 'react';
import Cell from '../components/Cell.tsx';
import useMousePress from '../hooks/useMousePress.ts'
import Spinner from '../components/Spinner.tsx';
import { BoardContext } from '../BoardContext.ts';
import { nextValue } from '../gameRules.ts'
import useWindowDimensions from '../hooks/useWindowDimensions.ts';


export interface ICell {
  row: number;
  col: number;
  value: 0 | 1;
}

const Board = () => {
  const pressed = useMousePress('board')
  const { width, height }: { width: number, height: number } = useWindowDimensions('board-wrapper')
  const columns = Math.floor(0.9 * width / 15)
  const rows = Math.floor(height / 15)
  const [round, setRound] = useState(0)

  const { board, setBoard, started, setStarted }: { board: ICell[][], setBoard: React.Dispatch<React.SetStateAction<ICell[][]>>, started: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>> } = useContext(BoardContext)
  const filled = useRef(null)


  const maxRounds = 10;

  const setCell = (cell: ICell) => {
    setBoard((board: ICell[][]) => {
      if (board[cell?.row]?.[cell?.col] != null) {
        board[cell?.row][cell?.col] = cell
      }
      return board
    })
  }

  // initializing board
  useEffect(() => {
    if (!started && !!rows && !!columns && board?.length === 1 && !filled.current) {
      filled.current = true;
      setBoard((board: ICell[][]) => {
        for (let r = 0; r < rows; r++) {
          board[r] = []
          for (let c = 0; c < columns; c++) {
            board[r][c] = { row: r, col: c, value: 0 }
          }
        }
        return board
      })
    }
  }, [rows, columns, started, setBoard, board])

  // running the calculation of next cycle
  useEffect(() => {
    const stepper = () => {
      setBoard((board: ICell[][]) => board.map((row: ICell[]) => {
        return (row.map((cell: ICell) => {
          return ({ ...cell, value: nextValue(cell, board) })
        }))
      }))
    }

    if (started && round <= maxRounds) {
      const intervalId = setInterval(() => {
        stepper()
        setRound(round => round + 1)
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [started, round, setBoard, setRound]);


  useEffect(() => {
    if (!started) {
      setRound(0)
    }
  }, [started, setRound])

  useEffect(() => {
    if (round + 1 > maxRounds) {
      setStarted(false)
    }
  }, [round, setStarted])



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