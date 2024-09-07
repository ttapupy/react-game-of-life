import { Route, Routes } from "react-router-dom"
import Patterns from "./pages/Patterns"
import './App.scss'
import SmartBoard from "./pages/SmartBoard.tsx";
import Footer from "./components/Footer.tsx";


const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<SmartBoard/>}/>
        <Route path="/patterns" element={<Patterns/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App