import React from 'react';
import { Route, Routes, Link } from "react-router-dom"
import Board from "./pages/Board"
import Patterns from "./pages/Patterns"
import './App.scss'
import { useLocation } from 'react-router-dom';



const App = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div style={{ width: '15%' }}>
        <nav>
          <ul className='wrapper__navlinks'>
            <li><Link className={`${pathname === '/' ? 'active-page' : 'inactive-page '}`} to="/"><button>Game Board</button></Link></li>
            <li><Link className={`${pathname === '/patterns' ? 'active-page' : 'inactive-page '}`} to="/patterns"><button>Saved patterns</button></Link></li>
          </ul>
        </nav>
        <aside>Description of the game...</aside>
      </div>

      <div style={{ width: '85%', padding: '3em' }}>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/patterns" element={<Patterns />} />
        </Routes>
      </div>
    </>
  )
}

export default App