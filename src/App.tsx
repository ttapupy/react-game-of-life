import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer.tsx";
import Patterns from "./pages/Patterns";
import "./App.scss";
import SmartBoard from "./pages/SmartBoard.tsx";
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<SmartBoard />} />
        <Route path="/patterns" element={<Patterns />} />
      </Routes>
      <Footer />
    </Provider>
  );
};

export default App;
