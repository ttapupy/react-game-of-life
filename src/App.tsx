import { Route, Routes, Link } from "react-router-dom"
import Board from "./pages/Board"
import Patterns from "./pages/Patterns"
import './App.scss'


const App = () => {

  return (
    <>
      <div style={{ width: '15%' }}>
        <nav>
          <ul>
            <li><Link to="/">Game Board</Link></li>
            <li><Link to="/patterns">Saved patterns</Link></li>
          </ul>
        </nav>
        <aside>Description of the game...</aside>
      </div>

      <div style={{ width: '85%' }}>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/personal" element={<Patterns />} />
        </Routes>
      </div>
    </>
  )
}

export default App