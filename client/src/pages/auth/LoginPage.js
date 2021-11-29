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
                this.setState({canBeRedirected: true});
                this.props.handleLogin(response.data.user);
            }
        }).catch((error) => {
            this.props.setNotification({message: error.response?.data?.error || "An error occurred, please try again later !", show: true, type: "error"});
        });
    }

    connectWithGoogle = () => {
        app.get('/auth/google').then((response) => {
            console.log(response);
        })
    }

    redirectLogin() {
        if (this.state.canBeRedirected)
            return (<Navigate to={"/"}/>)
    }

    render() {
        return (
            <div>
                {this.redirectLogin()}
                <ThemeProvider theme={theme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
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
                                <Button
                                    onClick={this.connectWithGoogle}
                                    fullWidth
                                    color={"error"}
                                    variant="contained"
                                    sx={{ mt: 0, mb: 2, py: 1.5}} >
                                    <FaGoogle/>
                                </Button>
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
