import { Route, Routes } from "react-router-dom"
import Patterns from "./pages/Patterns"
import './App.scss'
// import Board from './pages/Board';
import SmartBoard from "./pages/SmartBoard.tsx";
// import { BoardProvider } from './BoardContext.tsx';
import Footer from "./components/Footer.tsx";


const App = () => {

  /*
  BoardProvider which is based on React Context has been replaced by a Zustand solution.
  I keep the original files in the project to see the origin of this migration and to be able to compare the 2 kind of implementations.
   */

  return (
    <>
      {/*<BoardProvider>*/}
        <Routes>
          <Route path="/" element={<SmartBoard/>}/>
          <Route path="/patterns" element={<Patterns/>}/>
        </Routes>
      {/*</BoardProvider>*/}
      <Footer/>
    </>
  )
}

export default App