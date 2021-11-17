import React from "react";
import {AppBar, Box, Button, IconButton, MenuItem, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import { instanceOf } from 'prop-types';
import {Cookies, withCookies} from "react-cookie";
import app from "../../config/axiosConfig";

class TopbarComponent extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            user: {
                data: null
            }
        }
    }

    componentDidMount() {
        const { cookies } = this.props;
        let username = cookies.get('username');

        if (username !== undefined) {
           app.get(`user/${username}`).then((response) => {
               if (response.status === 200) {
                   this.setState({user: response.data});
               }
            });
        } else {
            console.log("NOT LOGGED")
        }
    }

    showLoginButton () {
        if (this.state.user.data === null) {
            return (<Link to="/auth/login">
                <Button color="inherit">
                    Login
                </Button>
            </Link>);
        } else {
            return (
                <Link to={"/user"}>
                    <p>
                        Welcome {this.state.user.username}
                    </p>
                </Link>
            )
        }
    }

    render() {
        return(
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}>
                            </IconButton>
                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                    <Link to={"/services"} style={{ textDecoration: 'none' }}>Service</Link>
                                </Typography>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <Link to={"/"} style={{ textDecoration: 'none' }}>Dashboard</Link>
                            </Typography>
                            {this.showLoginButton()}
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        )
    }

}

export default withCookies(TopbarComponent);
