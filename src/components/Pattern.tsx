import { FC, useCallback } from 'react'
import { useNavigate } from "react-router-dom";
import { CellValue } from '../pages/Board';
import { useGameRunner } from "../hooks/usegameRunner";
// import {loadBoard} from "../store/BoardSlice"
// import useBoardRect from "../hooks/useBoardRect";
import { useBoundStore } from "../store/useBoundStore";
import { drawSize } from "../constants";


interface IPatternProps {
  pattern: CellValue[][];
  index: number;
}

const Pattern: FC<IPatternProps> = ({pattern, index}) => {
  const {deletePattern} = useGameRunner();
  const {setRound, setLoaded, setActive, setStarted} = useBoundStore(state => state)
  const navigate = useNavigate();

  const loadPattern = useCallback(() => {
    setLoaded(true)
    setActive(false)
    setStarted(false)
    setRound(0)
    navigate('/', {state: {boardToLoad: pattern}})
  }, [navigate, pattern, setActive, setLoaded, setRound, setStarted])

  const deleteAction = () => {
    if (window.confirm("You are to removing permanently this pattern from your collection. \n" + "Are you sure?")) {
      deletePattern(index)
    }
  }

  return (
    <div className='pattern'>
      <div className='button-group'>
        <button onClick={() => loadPattern()} className='load'>{'Load'}</button>
        <button onClick={() => deleteAction()} className='delete'>{'Delete'}</button>
      </div>
      <fieldset disabled={true}>
        <div
          className='board-container'
          style={{gridTemplateColumns: `repeat(${drawSize}, 1fr)`, gridTemplateRows: `repeat(${drawSize}, 1fr)`}}
        >
          {pattern.map((row, rowIndex) => row.map((cellValue, columnIndex) => {
            return (
              <button
                key={`${rowIndex}_${columnIndex}`}
                disabled={true}
                data-state={`${cellValue}`}
                className={'cell-button'}
              />
            )
          }))}
        </div>
      </fieldset>
    </div>
  );
}

export default Pattern;
