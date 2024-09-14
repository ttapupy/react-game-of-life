import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Patterns from "./pages/Patterns";
import "./App.scss";
import SmartBoard from "./pages/SmartBoard.tsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SmartBoard />} />
        <Route path="/patterns" element={<Patterns />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
