import { Link } from 'react-router-dom';
import { useBoardContext, BoardAction, BoardActionKind } from '../BoardContext.tsx';



const MainSide = () => {
  const { started, setStarted, setActive, setBoard, rows, columns }:
    { started: boolean, setStarted: React.Dispatch<React.SetStateAction<boolean>>, setActive: React.Dispatch<React.SetStateAction<boolean>>, setBoard: React.Dispatch<BoardAction>, rows: number, columns: number } = useBoardContext();

  const arrowUp = String.fromCodePoint(0x02191);
  const description = <div className='description'>
    {
      `You can draw a shape (pattern) on the board with the mouse button pressed.
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
      <ul>
        <li style={{ margin: '40px 0' }}>
          <button
            className={`${started ? 'started' : 'iddle'}`}
            onClick={() => {
              setStarted(!started);
              setActive(true);
            }}
          >
            {`${started ? 'Stop' : 'Start'}`}
          </button>
        </li>
      </ul>

      <aside><small>{description}</small></aside>

      <ul>
        <li style={{ margin: '40px 0' }}>
          <button
            disabled={started}
            className={'inactive-page'}
            onClick={() => {
              setBoard({ type: BoardActionKind.INIT, payload: { height: rows, width: columns } });
              setActive(false)
            }}
          >
            {'Clear board'}
          </button>
        </li>
        <li>
          <Link
            className={'active-page'}
            to={'/patterns'}
          >
            <button>{'Saved patterns'}</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default MainSide;