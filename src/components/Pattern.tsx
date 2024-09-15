import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { drawSize } from "@/constants";
import { useGameRunner } from "@/hooks/usegameRunner";
import { CellValue } from "@/pages/SmartBoard";
import { loadBoard } from "@/store/boardSlice";
import { setRound, setStarted, setLoaded, setActive } from "@/store/gameSlice";
import type { RootState } from "@/store/store";

interface IPatternProps {
  pattern: CellValue[][];
  index: number;
}

const Pattern: FC<IPatternProps> = ({ pattern, index }) => {
  const { deleteSelectedPattern } = useGameRunner();
  const columns = useSelector((state: RootState) => state.game.columns);
  const rows = useSelector((state: RootState) => state.game.rows);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loadPattern = useCallback(() => {
    dispatch(setLoaded(true));
    dispatch(setActive(false));
    dispatch(setStarted(false));
    dispatch(setRound(0));
    navigate("/");
    dispatch(loadBoard({ boardToLoad: pattern, height: rows, width: columns }));
  }, [columns, navigate, pattern, rows, setActive, setLoaded, setRound, setStarted]);

  const deleteAction = () => {
    if (
      window.confirm(
        "You are to removing permanently this pattern from your collection. \n" + "Are you sure?",
      )
    ) {
      deleteSelectedPattern(index);
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
