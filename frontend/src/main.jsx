import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import App from './components/App'
import Dash from './routes/dash/Dash'
import RouterTest from './routes/RouterTest/RouterTest'
import TLNavbar from './components/TLNavbar.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: <RouterTest />,
  },
  {
    path: "/dash",
    element: <Dash />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TLNavbar></TLNavbar>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
