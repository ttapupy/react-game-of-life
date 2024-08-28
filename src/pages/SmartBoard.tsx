import { MutableRefObject, useEffect, useMemo } from 'react';
import Spinner from '../components/Spinner';
import MainSide from '../components/MainSide';
import { Row, Col } from 'react-bootstrap';
import Description from '../components/Description';
import SmartCell from "../components/SmartCell";
import { initBoard } from "../store/BoardSlice";
import { useBoundStore } from "../store/useBoundStore";
import useBoardRect, { DimensionsType } from "../hooks/useBoardRect";
import * as React from "react";
import usePrevious from "../hooks/usePrevious";
import { drawSize } from "../constants";


export enum CellValue {
  ZERO = 0,
  ONE = 1,
  NONE = -1
}

export interface ICell {
  row: number;
  col: number;
  value: CellValue;
}

const SmartBoard = () => {
  const started = useBoundStore(state => state.started)
  const active = useBoundStore(state => state.active)
  const loaded = useBoundStore(state => state.loaded)
  const columns = useBoundStore(state => state.columns)
  const rows = useBoundStore(state => state.rows)
  const initialized = useBoundStore(state => state.initialized)
  const setInitialized = useBoundStore(state => state.setInitialized)
  const setBoard = useBoundStore(state => state.dispatchBoard)
  const setDimensions = useBoundStore(state => state.setDimensions)
  const previousLoaded = usePrevious(loaded);

  const {
    dimensions: { width, height },
    setDisabledDimensions,
    boardRef,
  }: {
    dimensions: DimensionsType;
    setDisabledDimensions: React.Dispatch<React.SetStateAction<boolean>>;
    boardRef: React.MutableRefObject<HTMLDivElement | HTMLFieldSetElement>;
  } = useBoardRect(active);

  useEffect(() => {
    if (width && height) {
      setDimensions({ columns: width, rows: height })
    }
  }, [width, height, setDimensions])

  useEffect(() => {
    if (started || (loaded && previousLoaded) || active) {
      setDisabledDimensions(true);
    } else {
      setDisabledDimensions(false);
    }
  }, [started, active, setDisabledDimensions, loaded, previousLoaded]);


  /* initializing board */
  useEffect(() => {
    if (!started && !!rows && !!columns && !active && !loaded && !initialized) {
      initBoard(setBoard, { height: rows, width: columns });
      setInitialized(true);
    }
  }, [rows, columns, loaded, started, active, setBoard, initialized, setInitialized])

  /**
   * The intention with this empty Array was to not to use the 2 dimensional board array, which changes on every step.
   */
  const boardLengthArray = useMemo(() => {
    return (
      Array.from({ length: rows }, (_, r) => Array.from({ length: columns }, (_, c) => (
        <SmartCell rowIndex={r} columnIndex={c}
                   key={`${r}-${c}`}/>)))
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
            <fieldset
              id='board'
              ref={boardRef as MutableRefObject<HTMLFieldSetElement>}
            >
              {drawSize && columns && rows ?
                <>
                  {columns >= drawSize && rows >= drawSize ?
                    <div
                      className='board-container main'
                      id={'board-container'}
                      style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`
                      }}
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