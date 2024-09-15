import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGameRunner } from "@/hooks/usegameRunner";
import { initBoard } from "@/store/boardSlice";
import { setRound, setStarted, setLoaded, setActive } from "@/store/gameSlice";
import type { RootState } from "@/store/store";

const ButtonGroup = () => {
  const { saveSelectedPattern, saveDraw } = useGameRunner();
  const dispatch = useDispatch();
  const { started, round, loaded, active, columns, rows } = useSelector(
    (state: RootState) => state.game,
  );

  const onClear = () => {
    dispatch(initBoard({ height: rows, width: columns }));
    dispatch(setActive(false));
    dispatch(setRound(0));
    dispatch(setLoaded(false));
  };

  const runner = () => {
    if (!started && !active && !loaded) {
      saveDraw();
    }
    dispatch(setStarted(!started));
    dispatch(setActive(true));
    dispatch(setLoaded(false));
  };

  return (
    <>
      <div>
        <span>
          <Link className={"active-page"} to={"/patterns"}>
            <button onClick={() => dispatch(setStarted(false))}>{"Saved patterns"}</button>
          </Link>
        </span>
      </div>
      <div>
        <button disabled={started || !active} onClick={() => saveSelectedPattern()}>
          {"Save initial pattern"}
        </button>
      </div>
      <div>
        <button disabled={started} onClick={() => onClear()}>
          {"Clear / reset"}
        </button>
      </div>
      <div>
        <button className={`${started ? "started" : "iddle"}`} onClick={runner}>
          {`${started ? "Pause" : active && !loaded ? "Continue" : "Start"}`}
        </button>
      </div>
      <div style={{ textAlign: "center" }}>
        <span className="counter">{round}</span>
      </div>
    </>
  );
};

export default ButtonGroup;
