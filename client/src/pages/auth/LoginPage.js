import * as React from 'react';
import Grid from '@mui/material/Grid';
import {ThemeProvider} from "@emotion/react";

import {
    Alert,
    Avatar,
    Box,
    Button, Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel, Snackbar,
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
            message: '',
            open: false,
            canBeRedirected: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('username'))
            return this.setState({message: "Username cannot be empty !", open: true})

        if (!data.has('password'))
            return this.setState({message: "Password cannot be empty !", open: true})

        app.post("auth/login", {username: data.get('username'), password: data.get('password')}).then((response) => {
            if (response.status === 200) {
                this.setState({canBeRedirected: true});
                this.props.handleLogin(response.data.user);
            }
        }).catch((error) => {
            this.setState({message: error.response?.data?.error || "An error occurred, please try again later !", open: true})
        });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway')
            return;
        this.setState({
            message: "",
            open: false,
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
                    <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                        <Alert onClose={this.handleClose} severity="error" sx={{ width: '100%' }}>
                            {this.state.message}
                        </Alert>
                    </Snackbar>

                </ThemeProvider>
            </div>);
    }
}
