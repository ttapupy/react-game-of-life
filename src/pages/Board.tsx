import { useEffect } from 'react';
import Cell from '../components/Cell.tsx';
import Spinner from '../components/Spinner.tsx';
import { BoardAction, BoardActionKind } from '../BoardProvider.tsx';
import { useBoardContext } from '../BoardContext.ts';
import MainSide from '../components/MainSide.tsx';
import { Row, Col } from 'react-bootstrap';
import Description from '../components/Description.tsx';

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
  const { setBoard, started, active, setStarted, rows, columns, round, setRound, maxRounds, loaded, drawSize }: { setBoard: React.Dispatch<BoardAction>, started: boolean, active: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>>, rows: number, columns: number, round: number, setRound: React.Dispatch<React.SetStateAction<number>>, maxRounds: number, loaded: boolean, drawSize: number } = useBoardContext()


  // initializing board
  useEffect(() => {
    if (!started && !!rows && !!columns && !active && !loaded) {
      setBoard({ type: BoardActionKind.INIT, payload: { height: rows, width: columns } })
    }
  }, [rows, columns, started, setBoard, active, loaded])


  // running the calculation of next cycle
  useEffect(() => {

    const step = (prevRound) => {
      if (prevRound < maxRounds) {
        setBoard({ type: BoardActionKind.STEP })
        return prevRound + 1
      } else {
        return prevRound
      }
    }

    if (round === maxRounds) {
      setStarted(false)
      setRound(0)
    } else if (started) {
      const intervalId = setInterval(() => {
        setRound(prevRound => step(prevRound))
      }, 400);

      return () => clearInterval(intervalId);
    }
  }, [started, setBoard, round, setRound, setStarted, maxRounds]);



  return (
    <>
      <div className='wrapper' >
        <Row className='mobile-desc'>
          <Col className='d-flex justify-content-center'>
            <Description />
          </Col>
        </Row>

        <Row className='board-wrapper gx-1' id='board-wrapper'>
          <Col xs={3}>

            <MainSide />

          </Col>
          <Col xs={9} style={{ height: "100%" }}>

            <fieldset disabled={started} id='board'>
              {columns && rows ?
                <>
                  {columns >= drawSize && rows >= drawSize ?

                    <div
                      className='board-container'
                      id={'board-container'}
                      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
                    >
                      <>
                        {Array.from({ length: rows }, (_, r) => Array.from({ length: columns }, (_, c) => (<Cell row={r} column={c} key={`${r}-${c}`} />)))}
                      </>
                    </div> :
                    <div>{'Sorry, screen size is too small to play.'}</div>
                  }
                </> :
                <Spinner />}
            </fieldset>

          </Col></Row>
      </div>
    </>
  );
}

export default Board;