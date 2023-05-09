import { Link } from 'react-router-dom';

const PatternSide = () => {

  const selection = <div className='description selection'>
    {`You can choose and load from here one of your favorite patterns.`}
  </div>

  return (
    <div className='sidebar-content'>

      <aside><small>{selection}</small></aside>

      <ul>
        <li>
          <Link
            to={'/'}
          >
            <button>{'Back to Game Board'}</button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default PatternSide;