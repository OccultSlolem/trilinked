import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import App from './components/App'
import Dash from './routes/dash/Dash'
import RouterTest from './routes/RouterTest/RouterTest'
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
    <div className="navbar bg-base-200">
        <div className="navbar-start">
            <div className="navbar-item">
                <a href={`/`}><h1>Home</h1></a>
            </div>
        </div>
    </div>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
