import { Link } from 'react-router-dom';
import { initBoard } from '../store/BoardSlice';
import { useGameRunner } from "../hooks/usegameRunner";
import { useBoundStore } from "../store/useBoundStore";


const ButtonGroup = () => {
  const { savePattern } = useGameRunner()
  const setBoard = useBoundStore(state => state.dispatchBoard)
  const {started, setStarted, round, setRound, loaded, setLoaded, active, setActive, columns, rows} = useBoundStore(state => state)

  const onClear = () => {
    initBoard(setBoard, {height: rows, width: columns});
    setActive(false)
    setRound(0)
    setLoaded(false)
  }

  const runner = () => {
    setStarted(!started);
    setActive(true);
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
          onClick={runner}
        >
          {`${started ? 'Pause' : active && !loaded ? 'Continue' : 'Start'}`}
        </button>
      </div>
      <div style={{textAlign: 'center'}}>
        <span className='counter'>{round}</span>
      </div>
    </>
  )
}

export default ButtonGroup