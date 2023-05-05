import { useState } from 'react';
import { Route, Routes } from "react-router-dom"
import Patterns from "./pages/Patterns"
import './App.scss'
import { ICell } from 'pages/Board'
import Sidebar from './components/Sidebar';
import Board from './pages/Board';
import { BoardContext } from './BoardContext.ts';



const App = () => {
  const [started, setStarted] = useState(false)
  const [board, setBoard] = useState<ICell[][]>(() => [[]])

  return (
    <>
      <BoardContext.Provider value={{ board, setBoard, started, setStarted }}>
        <div className='sidebar-wrapper'>
          <Sidebar started={started} setStarted={setStarted} />
        </div>

        <div className='board-wrapper'>
          <Routes>
            <Route path="/" element={<Board />} />
            <Route path="/patterns" element={<Patterns />} />
          </Routes>
        </div>
      </BoardContext.Provider>
    </>
  )
}

export default App