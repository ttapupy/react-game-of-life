import { Link } from 'react-router-dom';
import { BoardAction, useBoardContext, initBoard } from '../BoardContext';


const ButtonGroup = () => {
  const { started, setStarted, setRound, setLoaded, loaded, setActive, setBoard, rows, columns, savePattern, active, round }:
    { started: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>>, setActive: React.Dispatch<React.SetStateAction<boolean>>, setRound: React.Dispatch<React.SetStateAction<number>>, setLoaded: React.Dispatch<React.SetStateAction<boolean>>, loaded: boolean, setBoard: React.Dispatch<BoardAction>, rows: number, columns: number, savePattern: () => void, active: boolean, round: number } = useBoardContext();

  const onClear = () => {
    initBoard(setBoard, { height: rows, width: columns });
    setActive(false)
    setRound(0)
    setLoaded(false)
  }


  return (
    <>
      <div>
        <span>
          <Link
            className={'active-page'}
            to={'/patterns'}
          >
            <button onClick={() => setStarted(false)}>{'Saved patterns'}</button>
          </Link>
        </span>
      </div>
      <div>
        <button
          disabled={started || !active}
          onClick={() => savePattern()}
        >
          {'Save initial pattern'}
        </button>
      </div>
      <div>
        <button
          disabled={started}
          onClick={() => onClear()}
        >
          {'Clear / reset'}
        </button>
      </div>
      <div>
        <button
          className={`${started ? 'started' : 'iddle'}`}
          onClick={() => {
            setStarted(!started);
            setActive(true);
            setLoaded(false)
          }}
        >
          {`${started ? 'Stop' : active && !loaded ? 'Continue' : 'Start'}`}
        </button>
      </div>
      <div style={{ textAlign: 'center' }}>
        <span className='counter'>{round}</span>
      </div>
    </>
  )
}

export default ButtonGroup