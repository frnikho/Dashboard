import * as React from 'react';
import Grid from '@mui/material/Grid';
import {ThemeProvider} from "@emotion/react";

import {
    Avatar,
    Box,
    Button, Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    TextField,
    Typography
} from "@mui/material";
import app from "../../config/axiosConfig";
import {Link, Navigate} from "react-router-dom";
import {FaGoogle} from "react-icons/all";
import { GoogleLogin } from 'react-google-login';
import Lottie from "lottie-react";
import login from "../../animations/login.json";

const theme = createTheme();

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canBeRedirected: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('username'))
            return this.props.setNotification({message: "Username cannot be empty !", show: true, type: "error"});

        if (!data.has('password'))
            return this.props.setNotification({message: "Password cannot be empty !",  show: true, type: "error"});

        app.post("auth/login", {username: data.get('username'), password: data.get('password')}).then((response) => {
            if (response.status === 200) {
                this.props.handleLogin(response.data);
                this.setState({canBeRedirected: true});
            }
        }).catch((error) => {
            this.props.setNotification({message: error.response?.data?.error || "An error occurred, please try again later !", show: true, type: "error"});
        });
    }

    connectWithGoogle = () => {
        app.post('/auth/google').then((response) => {

        })
    }

    redirectLogin() {
        if (this.state.canBeRedirected)
            return (<Navigate to={"/"}/>)
    }

    responseGoogle = (response) => {
        if (response.error !== undefined) {
            this.props.setNotification({message: "Cannot login with google", show: true, type: "error"});
            return;
        }
        app.post('/auth/google', response).then((data) => {
            if (data.status === 200) {
                this.props.handleLogin(data.data);
                this.setState({canBeRedirected: true});
            } else {
                this.props.setNotification({message: "An error occurred, please try again later", show: true, type: "error"});
            }
        })
    }

    render() {
        return (
            <div>
                {this.redirectLogin()}
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Box sx={{mb: 2}}>
                                <Typography component="h1" variant="h4">
                                    Sign in
                                </Typography>
                            </Box>
                            <Lottie animationData={login} style={{height: 200}}/>

                            <Box component="form" onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoFocus
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password" />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me" />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }} >
                                    Sign In
                                </Button>

                                <GoogleLogin
                                    render={renderProps => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            fullWidth
                                            color={"error"}
                                            variant="contained"
                                            sx={{ mt: 0, mb: 2, py: 1.5}}>
                                            <FaGoogle/>
                                        </Button>
                                    )}
                                    clientId={"829633951232-3qk22fesed0pln7b69p792tsrha1ucfb.apps.googleusercontent.com"}
                                    buttonText={"Login"}
                                    onSuccess={this.responseGoogle}
                                    onFailure={this.responseGoogle}
                                    cookiePolicy={'single_host_origin'}/>


                                <Grid container>
                                    <Grid item xs>
                                    </Grid>
                                    <Grid item>
                                        <Link to="/auth/register">
                                            Don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </div>);
    }
}
