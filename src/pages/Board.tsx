import { useEffect, useCallback, MutableRefObject, Dispatch, SetStateAction, useRef } from 'react';
import Cell from '../components/Cell';
import Spinner from '../components/Spinner';
import { BoardAction, useBoardContext, initBoard, stepBoard, writeBoard } from '../BoardContext';
import MainSide from '../components/MainSide';
import { Row, Col } from 'react-bootstrap';
import Description from '../components/Description';
import { isInDrawer } from '../drawer';


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
  const {
    boardRef,
    board,
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
    board: ICell[][],
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

  const handleSetBoard = ({row, column}: { row: number, column: number }) => {
    writeBoard(setBoard, {row, column})
  }

  const handleDrawable = useCallback(({row, column}: { row: number, column: number }) => {
    if (!active) {
      return isInDrawer({drawSize, side: rows, index: row}) && isInDrawer({drawSize, side: columns, index: column})
    }
    return true;
  }, [active, drawSize, rows, columns])


  const whatIsClass = ({row, column}) => {
    let className = 'cell-button'

    if (row === 0 && column + 1 === columns) {
      className = `${className} top-right-cell`
    } else if (column === 0 && row + 1 === rows) {
      className = `${className} bottom-left-cell`
    }

    return className
  }


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
              {!!board?.length && !!board[0].length && drawSize && !!columns && !!rows ?
                <>
                  {columns >= drawSize && rows >= drawSize ?
                    <div
                      className='board-container main'
                      id={'board-container'}
                      style={{gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)`}}
                    >
                      <>
                        {board.map(row => (
                          row.map(cell => {
                              const {row, col: column, value} = cell;
                              const classNames = whatIsClass({row, column})
                              return (
                                <Cell
                                  value={value}
                                  key={`${row}-${column}`}
                                  classNames={classNames}
                                  handleSetBoard={() => handleSetBoard({row, column})}
                                  drawable={handleDrawable({row, column})}
                                />
                              )
                            }
                          )
                        ))
                        }
                      </>
                    </div> :
                    <div>{'Sorry, screen size is too small to play.'}</div>
                  }
                </> :
                <Spinner/>}
            </fieldset>
          </Col></Row>
      </main>
    </>
  );
}

export default Board;