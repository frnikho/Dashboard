import React from "react";
import {Alert, Snackbar} from "@mui/material";

export default class NotificationManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            message: "",
            type: "success"
        }
        this.onClose = this.onClose.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            console.log(this.props);
            this.setState({
                show: this.props.notification.show,
                type: this.props.notification.type,
                message: this.props.notification.message,
            });
        }
    }

    onClose(event, reason) {
        if (reason === 'clickaway')
            return;
        this.setState({
            show: false,
        });
    }

    showNotification() {
        if (this.state.show !== true)
            return;

        return (
            <Snackbar open={this.state.show} autoHideDuration={3000} onClose={this.onClose}>
                <Alert onClose={this.onClose} severity={this.state.type} sx={{ width: '100%' }}>
                    {this.state.message}
                </Alert>
            </Snackbar>
        )
    }

    render() {
        return (
            <div>
                {this.showNotification()}
            </div>
        );
    }


}