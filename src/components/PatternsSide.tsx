import { Link } from 'react-router-dom';

const PatternSide = () => {

  const selection = <div className='description'>
    {`You can choose and load from here your favorite pattern.`}
  </div>

  return (
    <div className='sidebar-content'>
      <ul>
        <li style={{ margin: '40px 0' }}>
          <button>{'Load'}</button>
        </li>
      </ul>

      <aside><small>{selection}</small></aside>

      <ul>
        <li>
          <Link
            className={'inactive-page '}
            to={'/'}
          >
            <button>{'Game Board'}</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default PatternSide;