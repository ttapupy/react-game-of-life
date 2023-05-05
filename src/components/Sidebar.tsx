import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dispatch, SetStateAction } from "react";

interface ISideBarProps {
  started: boolean;
  setStarted: Dispatch<SetStateAction<boolean>>;
}


const Sidebar: React.FC<ISideBarProps> = ({ started, setStarted }) => {

  const { pathname } = useLocation();

  return (
    <>
      <ul>
        <li>
          <Link
            className={`${pathname === '/' ? 'active-page' : 'inactive-page '}`}
            to={`${pathname === '/' ? '/patterns' : '/'}`}
          >
            <button>{`${pathname === '/' ? 'Saved patterns' : 'Game Board'}`}</button>
          </Link>
        </li>

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
      <aside><small>Description of the game...</small></aside>
    </>
  )
}

export default Sidebar;