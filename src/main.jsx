import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Asset from './Asset.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { loader as assetLoader } from './Asset.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "assets/:assetId",
    element: <Asset/>,
    loader:assetLoader
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
