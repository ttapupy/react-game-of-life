import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dispatch, SetStateAction } from "react";

interface ISideBarProps {
  started: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
}


const Sidebar: React.FC<ISideBarProps> = ({ started, setStarted }) => {

  const { pathname } = useLocation();

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

  const selection = <div className='description'>
    {`You can choose and load from here your favorite pattern.`}
  </div>


  return (
    <>
      <ul>
        {pathname === '/' &&
          <li style={{ margin: '40px 0' }}>
            <button
              className={`${started ? 'started' : 'iddle'}`}
              onClick={() => setStarted(!started)}
            >
              {`${started ? 'Stop' : 'Start'}`}
            </button>
          </li>}
      </ul>

      <aside><small>{pathname === '/patterns' ? selection : description}</small></aside>

      <ul>
        <li>
          <Link
            className={`${pathname === '/' ? 'active-page' : 'inactive-page '}`}
            to={`${pathname === '/' ? '/patterns' : '/'}`}
          >
            <button>{`${pathname === '/' ? 'Saved patterns' : 'Game Board'}`}</button>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default Sidebar;