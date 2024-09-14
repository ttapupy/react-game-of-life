import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
