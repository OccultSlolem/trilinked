import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './components/App'
import RouterTest from './components/RouterTest'
import TLNavbar from './components/TLNavbar'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/test",
    element: <RouterTest />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TLNavbar/>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
