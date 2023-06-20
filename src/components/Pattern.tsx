import { Dispatch, SetStateAction } from 'react'
import { useNavigate } from "react-router-dom";
import { BoardAction, BoardActionKind } from '../BoardProvider';
import { useBoardContext } from '../BoardContext';
import PatternCell from './PatternCell';


const Pattern = ({ pattern, index }: { pattern: number[][], index: number }) => {

  const { drawSize, setBoard, setRound, rows, columns, setLoaded, deletePattern }: { drawSize: number, setBoard: React.Dispatch<BoardAction>, setRound: React.Dispatch<React.SetStateAction<number>>, rows: number, columns: number, setLoaded: Dispatch<SetStateAction<boolean>>, deletePattern: (index: number) => void } = useBoardContext();

  const navigate = useNavigate();

  const loadPattern = () => {
    setLoaded(true)
    setRound(0)
    setBoard({ type: BoardActionKind.LOAD, payload: { boardToLoad: pattern, drawSize, height: rows, width: columns } })
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
          style={{ gridTemplateColumns: `repeat(${drawSize}, 1fr)`, gridTemplateRows: `repeat(${drawSize}, 1fr)` }}
        >
          {pattern.map((sor, sorIndex) => sor.map((cellValue, oszlopIndex) => <PatternCell key={`${sorIndex}_${oszlopIndex}`} value={cellValue} />))}

        </div>
      </fieldset>
    </div>
  );
}

export default Pattern;
