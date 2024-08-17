import { useEffect, MutableRefObject, Dispatch, SetStateAction, useRef, useMemo } from 'react';
import Spinner from '../components/Spinner';
import { BoardAction, useBoardContext, initBoard, stepBoard } from '../BoardContext';
import MainSide from '../components/MainSide';
import { Row, Col } from 'react-bootstrap';
import Description from '../components/Description';
import SmartCell from "../components/SmartCell.tsx";


export enum CellValue {
  ZERO = 0,
  ONE = 1
}

export interface ICell {
  row: number;
  col: number;
  value: CellValue;
}

const SmartBoard = () => {
  const {
    boardRef,
    setBoard,
    started,
    active,
    setStarted,
    rows,
    columns,
    round,
    setRound,
    maxRounds,
    loaded,
    drawSize,
  }: {
    boardRef: MutableRefObject<HTMLDivElement | HTMLFieldSetElement>,
    setBoard: Dispatch<BoardAction>,
    started: boolean,
    active: boolean,
    setStarted: Dispatch<SetStateAction<boolean>>,
    rows: number,
    columns: number,
    round: number,
    setRound: Dispatch<SetStateAction<number>>,
    maxRounds: number,
    loaded: boolean,
    drawSize: number,
  } = useBoardContext()

  const delay = useRef(true)

  console.log('smartboard')

  // initializing board
  useEffect(() => {
    if (!started && !!rows && !!columns && !active && !loaded) {
      initBoard(setBoard, {height: rows, width: columns})
    }
  }, [rows, columns, started, setBoard, active, loaded])


  // running the calculation of next cycle
  useEffect(() => {
    const step = (prevRound: number) => {
      if (prevRound < maxRounds) {
        stepBoard(setBoard)
        return prevRound + 1
      } else {
        return prevRound
      }
    }

    if (round === maxRounds) {
      setStarted(false)
      delay.current = true
      setRound(0)
    } else if (started) {
      const intervalId = setInterval(() => {
        setRound(prevRound => step(prevRound))
      }, delay.current ? 800 : 500);
      delay.current = false

      return () => clearInterval(intervalId);
    }
  }, [started, setBoard, round, setRound, setStarted, maxRounds]);

  const boardLengthArray = useMemo(() => {
    return (
      Array.from({length: rows}, (_, r) => Array.from({length: columns}, (_, c) => (
        <SmartCell rowIndex={r} columnIndex={c} key={`${r}-${c}`}/>)))
    )
  }, [columns, rows])

  return (
    <>
      <main className='wrapper'>
        <Row className='mobile-desc gx-0'>
          <Col className='d-flex justify-content-center'>
            <Description/>
          </Col>
        </Row>
        <Row className='board-wrapper gx-1' id='board-wrapper'>
          <Col xs={12} sm={2} md={3}>
            <MainSide/>
          </Col>
          <Col xs={12} sm={10} md={9}>
            <fieldset id='board' ref={boardRef as MutableRefObject<HTMLFieldSetElement>}>
              {drawSize ?
                <>
                  {columns >= drawSize && rows >= drawSize ?
                    <div
                      className='board-container main'
                      id={'board-container'}
                      style={{gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`}}
                    >
                      {boardLengthArray}
                    </div> :
                    <div>{'Sorry, screen size is too small to play.'}</div>
                  }
                </> :
                <Spinner/>}
            </fieldset>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default SmartBoard;