import { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { maxRounds, drawSize } from "@/constants";
import { calcDrawer } from "@/drawer";
// import usePrevious from "@/hooks/usePrevious";
import { CellValue } from "@/pages/SmartBoard";
import { stepBoard, sumBoard } from "@/store/boardSlice";
import { setRound, setStarted } from "@/store/gameSlice";
import { savePattern, deletePattern } from "@/store/savedPatternSlice";
import type { RootState } from "@/store/store";

export const useGameRunner = () => {
  const [boardToSave, setBoardToSave] = useState<CellValue[][] | null>(null);
  const started = useSelector((state: RootState) => state.game.started);
  const round = useSelector((state: RootState) => state.game.round);
  const board = useSelector((state: RootState) => state.board.board, shallowEqual);
  const previousEqual = useSelector((state: RootState) => state.board.previousEqual);
  const rows = useSelector((state: RootState) => state.game.rows);
  const columns = useSelector((state: RootState) => state.game.columns);
  const dispatch = useDispatch();
  const [emptied, setEmptied] = useState(false);
  const boardValueSum = useSelector((state: RootState) => sumBoard(state.board));
  const alerted = useRef(false);

  const saveDraw = useCallback(() => {
    if ([board, rows, columns].every((e) => e != null)) {
      setBoardToSave(() =>
        // @ts-expect-error : nullchecked above
        calcDrawer({ table: board, rows, columns, drawSize }),
      );
    }
  }, [board, columns, rows]);

  const stopGame = () => {
    dispatch(setStarted(false));
    dispatch(setRound(0));
  };

  useEffect(() => {
    if (!alerted.current && started && round > 0 && previousEqual && boardValueSum) {
      alert(`Well, this will be boring: "still life" detected.`);
      alerted.current = true;
      return () => {
        dispatch(setStarted(false));
      };
    }
  }, [previousEqual, started, round, alerted.current]);

  // running the calculation of next cycle
  useEffect(() => {
    const step = (prevRound: number) => {
      if (prevRound < maxRounds) {
        dispatch(stepBoard());
        return prevRound + 1;
      } else {
        return prevRound;
      }
    };
    if (started && boardValueSum) {
      if (round === maxRounds) {
        stopGame();
      } else {
        const intervalId = setInterval(
          () => dispatch(setRound(step(round))),
          round === 0 ? 800 : 500,
        );
        return () => {
          clearInterval(intervalId);
        };
      }
    } else if (started) {
      stopGame();
      setEmptied(true);
    } else if (!started && boardValueSum) {
      setEmptied(false);
    }
  }, [started, round, setRound, setStarted, boardValueSum]);

  useEffect(() => {
    if (emptied) {
      alert("The board is empty :(");
      return () => setEmptied(false);
    }
  }, [emptied]);

  const saveSelectedPattern = useCallback(() => {
    if (boardToSave) {
      dispatch(savePattern(boardToSave));
      alert("Pattern has been saved.");
    }
  }, [boardToSave, savePattern]);

  const deleteSelectedPattern = (index: number) => {
    dispatch(deletePattern(index));
  };

  return {
    saveSelectedPattern,
    deleteSelectedPattern,
    saveDraw,
    emptied,
  };
};
