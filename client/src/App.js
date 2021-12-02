import React from "react";
import TopbarComponent from "./components/topbar/TopbarComponent";
import {Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import LoginPage from "./pages/auth/LoginPage";
import LogoutPage from "./pages/auth/LogoutPage";
import RegisterPage from "./pages/auth/RegisterPage";
import UserPage from "./pages/user";
import {withCookies} from "react-cookie";
import app, {config} from "./config/axiosConfig";
import NotificationManager from "./components/NotificationManager";
import {TokenContext} from "./context/TokenContext";

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
        this.getToken = this.getToken.bind(this);
    }

    componentDidMount() {
        this.getUser();
    }

    getToken() {
        const { cookies } = this.props;
        return cookies.get("access_token");
    }

    onLogin(data) {
        let user = data.user
        const { cookies } = this.props;
        cookies.set('username', user.username, { path: '/' });
        cookies.set('userId', user.id, { path: '/' });
        cookies.set("access_token", data.auth, { path: '/' });
        this.setState({user: user});
    }

    onLogout() {
        console.log("logout");
        this.setState({user: undefined});
    }

    getUser() {
        const { cookies } = this.props;
        let username = cookies.get('username');

        if (username !== undefined) {
            app.get(`user/${username}`, config(this.getToken())).then((response) => {
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

    showNotification() {
        if (this.state.notification !== undefined)
            return (<NotificationManager notification={this.state.notification}/>)
    }

    render() {
        return (
            <div>
            <TokenContext.Provider value={this.getToken()}>
                <TopbarComponent user={this.state.user}/>
                <Routes>
                    <Route path="/" element={<DashboardPage setNotification={this.setNotification}/>}/>
                    <Route path="auth">
                        <Route path="login" element={<LoginPage setNotification={this.setNotification} handleLogin={this.onLogin}/>}/>
                        <Route path="logout" element={<LogoutPage setNotification={this.setNotification} handleLogout={this.onLogout}/>}/>
                        <Route path="register" element={<RegisterPage setNotification={this.setNotification}/>}/>
                    </Route>
                    <Route path="/user" element={<UserPage setNotification={this.setNotification} handleLogout={this.onLogout}/>}/>
                </Routes>
                {this.showNotification()}
            </TokenContext.Provider>
        </div>)
    }
}

export default withCookies(App);