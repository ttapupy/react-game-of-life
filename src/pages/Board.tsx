import { useEffect, useCallback } from 'react';
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
  const { board, setBoard, started, active, setStarted, rows, columns, round, setRound, maxRounds, loaded, drawSize }: { board: ICell[][], setBoard: React.Dispatch<BoardAction>, started: boolean, active: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>>, rows: number, columns: number, round: number, setRound: React.Dispatch<React.SetStateAction<number>>, maxRounds: number, loaded: boolean, drawSize: number } = useBoardContext()

  // initializing board
  useEffect(() => {
    if (!started && !!rows && !!columns && !active && !loaded) {
      initBoard(setBoard, { height: rows, width: columns })
    }
  }, [rows, columns, started, setBoard, active, loaded])


  // running the calculation of next cycle
  useEffect(() => {
    const step = (prevRound) => {
      if (prevRound < maxRounds) {
        stepBoard(setBoard)
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

  const handleSetBoard = ({ row, column }: { row: number, column: number }) => {
    writeBoard(setBoard, { row, column })
  }

  const handleDrawable = useCallback(({ row, column }: { row: number, column: number }) => {
    if (!active && !loaded) {
      return isInDrawer({ drawSize, side: rows, index: row }) && isInDrawer({ drawSize, side: columns, index: column })
    }
    return true;
  }, [active, loaded, drawSize, rows, columns])


  return (
    <>
      <main className='wrapper' >
        <Row className='mobile-desc'>
          <Col className='d-flex justify-content-center'>
            <Description />
          </Col>
        </Row>
        <Row className='board-wrapper gx-1' id='board-wrapper'>
          <Col xs={12} sm={3}>
            <MainSide />
          </Col>
          <Col xs={12} sm={9} style={{ height: "100%" }}>
            <fieldset disabled={started} id='board'>
              {!!board?.length && !!board[0].length && drawSize && !!columns && !!rows ?
                <>
                  {columns >= drawSize && rows >= drawSize ?
                    <div
                      className='board-container'
                      id={'board-container'}
                      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
                    >
                      <>
                        {board.map(sor => (
                          sor.map(cella => (
                            <Cell
                              key={`${cella.row}-${cella.col}`}
                              handleSetBoard={() => handleSetBoard({ row: cella.row, column: cella.col })}
                              value={cella.value}
                              drawable={handleDrawable({ row: cella.row, column: cella.col })}
                            />
                          )
                          )
                        ))
                        }
                      </>
                    </div> :
                    <div>{'Sorry, screen size is too small to play.'}</div>
                  }
                </> :
                <Spinner />}
            </fieldset>
          </Col></Row>
      </main>
    </>
  );
}

export default Board;