import { useBoundStore } from "../store/useBoundStore";
import { useShallow } from "zustand/react/shallow";
import { useCallback, useEffect, useState } from "react";
import { stepBoard } from "../store/BoardSlice";
import { calcDrawer } from "../drawer";
import { maxRounds, drawSize } from "../constants";
import { CellValue } from "../pages/SmartBoard";


export const useGameRunner = () => {
  const [boardToSave, setBoardToSave] = useState<CellValue[][] | null>(null);
  const {
    board,
    started,
    round,
    setStarted,
    setRound,
    savePattern,
    deletePattern,
    rows,
    columns
  } = useBoundStore(state => state)
  const setBoard = useBoundStore(useShallow(state => state.dispatchBoard))


  const saveDraw = useCallback(() => {
    if ([board, rows, columns].every((e) => e != null)) {
      setBoardToSave(() => calcDrawer({ table: board, rows, columns, drawSize }));
    }
  }, [board, columns, rows]);

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
      setRound(0)
    } else if (started) {
      const intervalId = setInterval(() => {
        setRound(step(round))
      }, round === 0 ? 800 : 500);

      return () => clearInterval(intervalId);
    }
  }, [started, setBoard, round, setRound, setStarted]);

  const saveSelectedPattern = useCallback(() => {
    savePattern(boardToSave);
    alert("Pattern has been saved.");
  }, [boardToSave, savePattern]);


  return ({
    saveSelectedPattern,
    deletePattern,
    saveDraw
  })

}