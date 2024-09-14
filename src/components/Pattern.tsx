import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { drawSize } from "@/constants";
import { useGameRunner } from "@/hooks/usegameRunner";
import { CellValue } from "@/pages/SmartBoard";
import { loadBoard } from "@/store/BoardSlice";
import { useBoundStore } from "@/store/useBoundStore";

interface IPatternProps {
  pattern: CellValue[][];
  index: number;
}

const Pattern: FC<IPatternProps> = ({ pattern, index }) => {
  const { deletePattern } = useGameRunner();
  const { setRound, setLoaded, setActive, setStarted, rows, columns } =
    useBoundStore((state) => state);
  const setBoard = useBoundStore((state) => state.dispatchBoard);
  const navigate = useNavigate();

  const loadPattern = useCallback(() => {
    setLoaded(true);
    setActive(false);
    setStarted(false);
    setRound(0);
    navigate("/");
    loadBoard(setBoard, { boardToLoad: pattern, height: rows, width: columns });
  }, [
    columns,
    navigate,
    pattern,
    rows,
    setActive,
    setBoard,
    setLoaded,
    setRound,
    setStarted,
  ]);

  const deleteAction = () => {
    if (
      window.confirm(
        "You are to removing permanently this pattern from your collection. \n" +
          "Are you sure?",
      )
    ) {
      deletePattern(index);
    }
  };

  return (
    <div className="pattern">
      <div className="button-group">
        <button onClick={() => loadPattern()} className="load">
          {"Load"}
        </button>
        <button onClick={() => deleteAction()} className="delete">
          {"Delete"}
        </button>
      </div>
      <fieldset disabled={true}>
        <div
          className="board-container"
          style={{
            gridTemplateColumns: `repeat(${drawSize}, 1fr)`,
            gridTemplateRows: `repeat(${drawSize}, 1fr)`,
          }}
        >
          {pattern.map((row, rowIndex) =>
            row.map((cellValue, columnIndex) => {
              return (
                <button
                  key={`${rowIndex}_${columnIndex}`}
                  disabled={true}
                  data-state={`${cellValue}`}
                  className={"cell-button"}
                />
              );
            }),
          )}
        </div>
      </fieldset>
    </div>
  );
};

export default Pattern;
