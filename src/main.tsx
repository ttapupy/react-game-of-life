import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.scss'
import { BrowserRouter } from 'react-router-dom';
import "./App.scss";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)