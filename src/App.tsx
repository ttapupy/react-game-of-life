import { Route, Routes } from "react-router-dom"
import Patterns from "./pages/Patterns"
import './App.scss'
import Board from './pages/Board';
import { BoardProvider } from './BoardProvider.tsx';
import Footer from "./components/Footer.tsx";


const App = () => {

  return (
    <>
      <BoardProvider>
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/patterns" element={<Patterns />} />
        </Routes>
      </BoardProvider>
      <Footer />
    </>
  )
}

export default App