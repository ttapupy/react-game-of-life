import { MutableRefObject, useEffect, useMemo } from "react";
import * as React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Description from "../components/Description";
import MainSide from "../components/MainSide";
import SmartCell from "../components/SmartCell";
import Spinner from "../components/Spinner";
import useBoardRect, { DimensionsType } from "../hooks/useBoardRect";
import usePrevious from "../hooks/usePrevious";
import { drawSize } from "@/constants";
import { bordHasValueBool, initBoard } from "@/store/boardSlice";
import { setInitialized, setDimensions } from "@/store/gameSlice";
import type { RootState } from "@/store/store";

export type CellValue = 0 | 1 | -1;

export interface ICell {
  row: number;
  col: number;
  value: CellValue;
}

const SmartBoard = () => {
  const dispatch = useDispatch();
  const started = useSelector((state: RootState) => state.game.started);
  const active = useSelector((state: RootState) => state.game.active);
  const loaded = useSelector((state: RootState) => state.game.loaded);
  const columns = useSelector((state: RootState) => state.game.columns);
  const rows = useSelector((state: RootState) => state.game.rows);
  const bordHasValue = useSelector((state: RootState) => bordHasValueBool(state.board));
  const previousLoaded = usePrevious(loaded);

  const {
    dimensions: { width, height },
    setDisabledDimensions,
    boardRef,
  }: {
    dimensions: DimensionsType;
    setDisabledDimensions: React.Dispatch<React.SetStateAction<boolean>>;
    boardRef: React.MutableRefObject<HTMLDivElement | HTMLFieldSetElement | null>;
  } = useBoardRect(active);

  useEffect(() => {
    if (width && height) {
      dispatch(setDimensions({ columns: width, rows: height }));
    }
  }, [width, height, setDimensions]);

  useEffect(() => {
    if (started || (loaded && previousLoaded) || active) {
      setDisabledDimensions(true);
    } else {
      setDisabledDimensions(false);
    }
  }, [started, active, setDisabledDimensions, loaded, previousLoaded]);

  /* initializing board */
  useEffect(() => {
    if (!started && !!rows && !!columns && !active && !loaded && !bordHasValue) {
      dispatch(initBoard({ height: rows, width: columns }));
      dispatch(setInitialized(true));
    }
  }, [rows, columns, loaded, started, active, bordHasValue, setInitialized]);

  /**
   * The intention with this empty Array was to not use the 2-dimensional board array, which changes on every step.
   */
  const boardLengthArray = useMemo(() => {
    return Array.from({ length: rows ?? 0 }, (_, r) =>
      Array.from({ length: columns ?? 0 }, (_, c) => (
        <SmartCell rowIndex={r} columnIndex={c} key={`${r}-${c}`} />
      )),
    );
  }, [columns, rows]);

  return (
    <>
      <main className="wrapper">
        <Row className="mobile-desc gx-0">
          <Col className="d-flex justify-content-center">
            <Description />
          </Col>
        </Row>
        <Row className="board-wrapper gx-1" id="board-wrapper">
          <Col xs={12} sm={2} md={3}>
            <MainSide />
          </Col>
          <Col xs={12} sm={10} md={9}>
            <fieldset id="board" ref={boardRef as MutableRefObject<HTMLFieldSetElement>}>
              {drawSize && columns && rows ? (
                <>
                  {columns >= drawSize && rows >= drawSize ? (
                    <div
                      className="board-container main"
                      id={"board-container"}
                      style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridTemplateRows: `repeat(${rows}, 1fr)`,
                      }}
                    >
                      {boardLengthArray}
                    </div>
                  ) : (
                    <div>{"Sorry, screen size is too small to play."}</div>
                  )}
                </>
              ) : (
                <Spinner />
              )}
            </fieldset>
          </Col>
        </Row>
      </main>
    </>
  );
};

export default SmartBoard;
