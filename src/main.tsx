import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.scss'
import { BrowserRouter } from 'react-router-dom';
import Spinner from './components/Spinner.tsx';

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <App />
        </Suspense>
      </BrowserRouter>
      )