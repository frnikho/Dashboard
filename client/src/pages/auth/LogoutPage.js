import React from "react";
import app from "../../config/axiosConfig";
import {Navigate} from "react-router-dom";

class LogoutPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        }
    }

    componentDidMount() {
        app.post('auth/logout').then((response) => {
            this.props.handleLogout();
        }).catch((err) => {
            console.log(err.response);
            this.props.handleLogout();
        });
    }

    render() {
        return (
        <div>
            {this.props.redirect && <Navigate to="/auth/login"/>}
        </div>
        )
    }

}

export default LogoutPage