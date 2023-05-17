import { Link } from 'react-router-dom';

const PatternSide = () => {

  const selection = <div className='description selection'>
    {`You can choose and load from here one of your favorite patterns.`}
  </div>

  return (
    <div className='sidebar-content d-flex flex-column align-items-center justify-content-center'>

      <aside><small>{selection}</small></aside>

      <div>
        <span>
          <Link
            to={'/'}
          >
            <button>{'Back to Game Board'}</button>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default PatternSide;