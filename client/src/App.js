import React from "react";
import TopbarComponent from "./components/topbar/TopbarComponent";
import {Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserPage from "./pages/user";
import Services from "./pages/services";
import {withCookies} from "react-cookie";
import app from "./config/axiosConfig";
import NotificationManager from "./components/NotificationManager";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            canRedirect: false,
            notification: undefined
        }
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.setNotification = this.setNotification.bind(this);
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
                this.setNotification({message: "You're not logged !", type: "info", show: true});
            });
        } else {
            this.setState({canRedirect: true})
        }
    }

    setNotification(notif) {
        this.setState({notification: notif});
    }

    render() {
        return (<div>
            <TopbarComponent user={this.state.user}/>
            <Routes>
                <Route path="/" element={<DashboardPage setNotification={this.setNotification}/>}/>
                <Route path="auth">
                    <Route path="login" element={<LoginPage setNotification={this.setNotification} handleLogin={this.onLogin}/>}/>
                    <Route path="logout" element={<LogoutPage setNotification={this.setNotification} handleLogout={this.onLogout}/>}/>
                    <Route path="register" element={<RegisterPage setNotification={this.setNotification}/>}/>
                </Route>
                <Route path="/user" element={<UserPage setNotification={this.setNotification} handleLogout={this.onLogout}/>}/>
                <Route path="/services" element={<Services/>}/>
            </Routes>
            <NotificationManager notification={this.state.notification}/>
        </div>)
    }
}

export default withCookies(App);