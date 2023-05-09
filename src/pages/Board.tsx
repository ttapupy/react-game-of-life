import { useEffect, useState, useRef } from 'react';
import Cell from '../components/Cell.tsx';
import Spinner from '../components/Spinner.tsx';
import { useBoardContext, BoardAction, BoardActionKind } from '../BoardContext.tsx';
import MainSide from '../components/MainSide.tsx';

export enum CellValue {
  ZERO = 0,
  ONE = 1
}

export interface ICell {
  row: number;
  col: number;
  value: CellValue;
}

const Board = () => {
  const { setBoard, started, active, setStarted, rows, columns, round, setRound, maxRounds }: { setBoard: React.Dispatch<BoardAction>, started: boolean, active: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>>, rows: number, columns: number, round: number, setRound: React.Dispatch<React.SetStateAction<number>>, maxRounds: number } = useBoardContext()
  const filled = useRef(null)
  



  // initializing board
  useEffect(() => {
    if (!started && !!rows && !!columns && !active) {
      filled.current = true;
      setBoard({ type: BoardActionKind.INIT, payload: { height: rows, width: columns } })
    }
  }, [rows, columns, started, setBoard, active])

  // running the calculation of next cycle
  useEffect(() => {

    if (started && round <= maxRounds) {
      const intervalId = setInterval(() => {
        setBoard({ type: BoardActionKind.STEP })
        setRound(round => round + 1)
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [started, round, setBoard, setRound, maxRounds]);


  useEffect(() => {
    if (!started) {
      setRound(0)
    }
  }, [started, setRound])

  useEffect(() => {
    if (round + 1 > maxRounds) {
      setStarted(false)
    }
  }, [round, setStarted, maxRounds])



  return (
    <>
      <div className='sidebar-wrapper'>
        <MainSide />
      </div>
      <div className='board-wrapper' id='board-wrapper'>
        <fieldset disabled={started}>
          {columns && rows ?
            <>
              {columns >= 10 && rows >= 10 ?

                <div
                  className='board-container'
                  id={'board-container'}
                  style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
                >
                  <>
                    {Array.from({ length: rows }, (_, r) => Array.from({ length: columns }, (_, c) => (<Cell row={r} column={c} key={`${r}-${c}`} />)))}
                  </>
                </div> :
                <div>{'Sorry, screen size is too small to play'}</div>
              }
            </> :
            <Spinner />}
        </fieldset>
      </div>
    </>
  );
}

export default Board;