import { Link } from 'react-router-dom';
import { BoardAction, BoardActionKind } from '../BoardProvider.tsx';
import { useBoardContext } from '../BoardContext.ts';



const MainSide = () => {
  const { started, setStarted, setRound, setLoaded, loaded, setActive, setBoard, rows, columns, savePattern, active, round }:
    { started: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>>, setActive: React.Dispatch<React.SetStateAction<boolean>>, setRound: React.Dispatch<React.SetStateAction<number>>, setLoaded: React.Dispatch<React.SetStateAction<boolean>>, loaded: boolean, setBoard: React.Dispatch<BoardAction>, rows: number, columns: number, savePattern: () => void, active: boolean, round: number } = useBoardContext();

  const description = <div className='description'>
    {
      `You can draw a shape (pattern) in the grid with the mouse button pressed.
      When you are done, the process can be started.`}<br />
    {`It works based on the `} <b>{'Game of Life'}</b> {`rules, which you can read more about `}
    <span>
      <a style={{ textDecoration: 'underline' }} href={'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'} target={'_blank'}>{'here'}</a>
    </span>
    {`. `}<br />
    {'In current version it takes 10 rounds per start.'}<br />
    {'After that, the game can be continued from the existing pattern (if any), or even from a supplemented one.'}<br />
    {`Have fun!`}
  </div>

  const onClear = () => {
    setBoard({ type: BoardActionKind.INIT, payload: { height: rows, width: columns } });
    setActive(false)
    setRound(0)
    setLoaded(false)
  }


  return (
    <div className='sidebar-content'>

      <aside><small>{description}</small></aside>

      <ul>
        <li>
          <span>
            <Link
              className={'active-page'}
              to={'/patterns'}
            >
              <button onClick={() => setStarted(false)}>{'Saved patterns'}</button>
            </Link>
          </span>
        </li>

        <li>
          <button
            disabled={started || !active}
            onClick={() => savePattern()}
          >
            {'Save your initial pattern'}
          </button>
        </li>

        <li>
          <button
            disabled={started}
            onClick={() => onClear()}
          >
            {'Clear / reset board'}
          </button>
        </li>
        <div className='desktop-start'>
          <li>
            <div style={{ textAlign: 'center' }}>
              <span className='counter'>{round}</span>
            </div>
          </li>
          <li>
            <button
              className={`${started ? 'started' : 'iddle'}`}
              onClick={() => {
                setStarted(!started);
                setActive(true);
              }}
            >
              {`${started ? 'Stop' : active && !loaded ? 'Continue' : 'Start'}`}
            </button>
          </li>
        </div>
      </ul>
    </div >
  )
}

export default MainSide;