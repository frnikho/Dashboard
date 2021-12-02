import React from "react";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default class TopbarComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.user !== this.props.user)
            this.setState({user: this.props.user});
    }

    showLoginButton () {
        if (this.state.user === undefined) {
            return (<Link to="/auth/login" style={{ textDecoration: 'none'}}>
                <Button color="inherit">
                    Login
                </Button>
            </Link>);
        } else {
            return (
                <Link to={"/user"} style={{ textDecoration: 'none'}}>
                    <Button style={{color: "black"}}>
                        Welcome {this.state.user.username}
                    </Button>
                </Link>
            )
        }
    }

    render() {
        return(
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar style={{ background: 'transparent', boxShadow: 'none'}} position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}>
                            </IconButton>

                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="common.white">
                            </Typography>
                            {this.showLoginButton()}
                        </Toolbar>
                    </AppBar>
                </Box>
            </div>
        )
    }

}