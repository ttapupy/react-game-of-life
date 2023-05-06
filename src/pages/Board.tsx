import { useEffect, useState, useRef } from 'react';
import Cell from '../components/Cell.tsx';
import useMousePress from '../hooks/useMousePress.ts'
import Spinner from '../components/Spinner.tsx';
import { useBoardContext, BoardAction, BoardActionKind } from '../BoardContext.tsx';
import MainSide from '../components/MainSide.tsx';



export interface ICell {
  row: number;
  col: number;
  value: 0 | 1;
}

const Board = () => {
  const pressed = useMousePress('board')
  const [round, setRound] = useState(0)
  const { board, setBoard, started, setStarted, rows, columns }: { board: ICell[][], setBoard: React.Dispatch<BoardAction>, started: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>>, rows: number, columns: number } = useBoardContext()
  const filled = useRef(null)

  const maxRounds = 10;


  // initializing board
  useEffect(() => {
    if (!started && !!rows && !!columns && board?.length === 1 && !filled.current) {
      filled.current = true;
      setBoard({ type: BoardActionKind.INIT, payload: { height: rows, width: columns } })
    }
  }, [rows, columns, started, setBoard, board])

  // running the calculation of next cycle
  useEffect(() => {

    if (started && round <= maxRounds) {
      const intervalId = setInterval(() => {
        setBoard({ type: BoardActionKind.STEP })
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
      <div className='sidebar-wrapper'>
        <MainSide />
      </div>
      <div className='board-wrapper'>
        <fieldset style={{ border: '0' }} disabled={started}>
          <div
            className='board'
            id={'board'}
          >
            {board?.length > 1 ?
              (<div
                className='board-container'
                style={{ gridTemplateColumns: `repeat(${columns}, 15px)`, gridTemplateRows: `repeat(${rows}, 15px)` }}
              >
                {board.map((sor: ICell[]) => {
                  return (sor.map((cella: ICell) => {
                    return (<Cell cell={cella} key={`${cella?.row}-${cella?.col}`} pressed={pressed} />)
                  }))
                })
                }
              </div>) :
              <Spinner />}
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default Board;