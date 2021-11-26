import React from "react";
import TopbarComponent from "./components/topbar/TopbarComponent";
import {Navigate, Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserPage from "./pages/user";
import Services from "./pages/services";
import {withCookies} from "react-cookie";
import app from "./config/axiosConfig";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            canRedirect: false,
        }
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogin(user) {
        const { cookies } = this.props;
        cookies.set('username', user.username);
        cookies.set('userId', user.userId);
        this.setState({user: user});
        console.log("login");
    }

    onLogout() {
        this.setState({user: undefined});
        console.log("logout");
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        const { cookies } = this.props;
        let username = cookies.get('username');

        if (username !== undefined) {
            app.get(`user/${username}`).then((response) => {
                if (response.status === 200) {
                    this.setState({user: response.data});
                }
            }).catch((err) => {
                console.log(err.response);
            });
        } else {
            this.setState({canRedirect: true})
        }
    }

    render() {
        return (<div>
            <TopbarComponent user={this.state.user}/>
            <Routes>
                <Route path="/" element={<DashboardPage/>}/>
                <Route path="auth">
                    <Route path="login" element={<LoginPage handleLogin={this.onLogin}/>}/>
                    <Route path="logout" element={<LogoutPage handleLogout={this.onLogout}/>}/>
                    <Route path="register" element={<RegisterPage/>}/>
                </Route>
                <Route path="/user" element={<UserPage handleLogout={this.onLogout}/>}/>
                <Route path="/services" element={<Services/>}/>
            </Routes>
        </div>)
    }
}

export default withCookies(App);