import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom"
import Board from "./pages/Board"
import Patterns from "./pages/Patterns"
import './App.scss'
import Sidebar from './components/Sidebar';



const App = () => {

  const [started, setStarted] = useState(false)

  return (
    <>
      <div className='sidebar-wrapper'>
        <Sidebar started={started} setStarted={setStarted} />
      </div>

      <div className='board-wrapper'>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/patterns" element={<Patterns />} />
        </Routes>
      </div>
    </>
  )
}

export default App