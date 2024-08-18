import { useBoundStore } from "../store/useBoundStore";
import { useShallow } from "zustand/react/shallow";
import useBoardRect from "./useBoardRect";
import { useCallback, useEffect, useState } from "react";
import { stepBoard } from "../store/BoardSlice";
import useLocalStorage from "./useLocalStorage";
import { calcDrawer } from "../drawer";
import { maxRounds, drawSize } from "../constants";


export const useGameRunner = () => {
  const [, setSavedPatterns] = useLocalStorage("GOLSavedPatterns", []);
  const [boardToSave, setBoardToSave] = useState<number[][] | null>(null);
  const {board, started, active, round, setStarted, setRound} = useBoundStore(state => state)
  const setBoard = useBoundStore(useShallow(state => state.dispatchBoard))

  const {
    dimensions: {width: columns, height: rows}
  } = useBoardRect(active);


  const saveDraw = useCallback(() => {
    if (!active && [board, rows, columns].every((e) => e != null)) {
      setBoardToSave(() => calcDrawer({table: board, rows, columns, drawSize}));
    }
  }, [active, board, columns, rows]);

  useEffect(() => {
    if (!active) {
      saveDraw();
    }
  }, [active, saveDraw, board]);

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

  const savePattern = useCallback(() => {
    setSavedPatterns((prevCollection) => [boardToSave, ...(prevCollection || [])]);
    alert("Pattern has been saved.");
  }, [boardToSave, setSavedPatterns]);

  const deletePattern = useCallback(
    (index: number) => {
      setSavedPatterns((prevCollection) => prevCollection.filter((_, i) => i !== index));
    },
    [setSavedPatterns]
  );

  return ({
    savePattern,
    deletePattern
  })

}