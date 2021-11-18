import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard";
import {CookiesProvider} from "react-cookie";
import LogoutPage from "./pages/auth/LogoutPage";
import UserPage from "./pages/user";
import RegisterPage from "./pages/auth/RegisterPage";
import Services from "./pages/services";
import {Button} from "@mui/material";
import TopbarComponent from "./components/topbar/TopbarComponent";

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <BrowserRouter>
                <TopbarComponent/>
                <Routes>
                    <Route path="/" element={<DashboardPage/>}/>
                    <Route path="auth">
                        <Route path="login" element={<LoginPage/>}/>
                        <Route path="logout" element={<LogoutPage/>}/>
                        <Route path="register" element={<RegisterPage/>}/>
                    </Route>
                    <Route path="/user" element={<UserPage/>}/>
                    <Route path="/services" element={<Services/>}/>
                </Routes>
            </BrowserRouter>
        </CookiesProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
