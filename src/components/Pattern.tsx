import { Dispatch, SetStateAction, FC } from 'react'
import { useNavigate } from "react-router-dom";
import { BoardAction, useBoardContext, loadBoard } from '../BoardContext';
import { CellValue } from '../pages/Board';

interface IPatternProps {
  pattern: CellValue[][];
  index: number;
}

const Pattern: FC<IPatternProps> = ({pattern, index}) => {
  const {drawSize, setBoard, setRound, rows, columns, setLoaded, deletePattern, setActive, setStarted}: {
    drawSize: number,
    setBoard: React.Dispatch<BoardAction>,
    setRound: React.Dispatch<React.SetStateAction<number>>,
    rows: number,
    columns: number,
    setLoaded: Dispatch<SetStateAction<boolean>>,
    deletePattern: (index: number) => void,
    setActive: React.Dispatch<React.SetStateAction<boolean>>,
    setStarted: React.Dispatch<React.SetStateAction<boolean>>,
  } = useBoardContext();

  const navigate = useNavigate();

  const loadPattern = () => {
    setLoaded(true)
    setActive(false)
    setStarted(false)
    setRound(0)
    loadBoard(setBoard, {boardToLoad: pattern, drawSize, height: rows, width: columns})
    navigate('/')
  }

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
