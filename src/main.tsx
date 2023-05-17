import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';
import "./App.scss";

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <HashRouter>
    <App />
  </HashRouter>
)