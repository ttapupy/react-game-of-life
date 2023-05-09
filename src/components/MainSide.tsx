import { Link } from 'react-router-dom';
import { useBoardContext, BoardAction, BoardActionKind } from '../BoardContext.tsx';



const MainSide = () => {
  const { started, setStarted, setActive, setBoard, rows, columns, savePattern, active, round, maxRounds }:
    { started: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>>, setActive: React.Dispatch<React.SetStateAction<boolean>>, setBoard: React.Dispatch<BoardAction>, rows: number, columns: number, savePattern: () => void, active: boolean, round: number, maxRounds: number } = useBoardContext();

  const arrowUp = String.fromCodePoint(0x02193);
  const arrowRight = String.fromCodePoint(0x02192);
  const description = <div className='description'>
    {
      `You can draw a shape (pattern) on the board ${arrowRight} with the mouse button pressed.
      When you are done, the process can be started. ${arrowUp}`}<br />
    {`It works based on the `} <b>{'Game of Life'}</b> {`rules, which you can read more about `}
    <span>
      <a style={{ textDecoration: 'underline' }} href={'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'} target={'_blank'}>{'here'}</a>
    </span>
    {`. `}<br />
    {'(In current version it takes 10 rounds per start.)'}<br />
    {`Have fun!`}
  </div>


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
              <button>{'Saved patterns'}</button>
            </Link>
          </span>
        </li>

        <li style={{ margin: '40px 0' }}>
          <button
            disabled={started || !active}
            onClick={() => savePattern()}
          >
            {'Save your initial pattern'}
          </button>
        </li>

        <li style={{ margin: '40px 0' }}>
          <button
            disabled={started}
            onClick={() => {
              setBoard({ type: BoardActionKind.INIT, payload: { height: rows, width: columns } });
              setActive(false)
            }}
          >
            {'Clear / reset board'}
          </button>
        </li>
        <li style={{ margin: '40px 0' }}>
          <button
            className={`${started ? 'started' : 'iddle'}`}
            onClick={() => {
              setStarted(!started);
              setActive(true);
            }}
          >
            {`${started ? 'Stop' : active ? 'Continue' : 'Start'}`}
          </button>
        </li>
        <li>
          <div style={{ textAlign: 'center'}}>
            <span className='counter'>{maxRounds - round}</span>
          </div>
        </li>
      </ul>
    </div >
  )
}

export default MainSide;