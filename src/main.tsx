import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./Profile";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <>
        <App/>
    </>
)
