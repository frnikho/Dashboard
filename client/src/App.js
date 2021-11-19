import React from "react";
import TopbarComponent from "./components/topbar/TopbarComponent";
import {Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserPage from "./pages/user";
import Services from "./pages/services";

function onLogin(user) {
    console.log(user);
}

export default class App extends React.Component {
    render() {
        return(<div>
            <TopbarComponent/>
            <Routes>
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="auth">
                    <Route path="login" element={<LoginPage handleLogin={onLogin}/>}/>
                    <Route path="logout" element={<LogoutPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                </Route>
                <Route path="/user" element={<UserPage/>}/>
                <Route path="/services" element={<Services/>}/>
            </Routes>
        </div>)
    }
}