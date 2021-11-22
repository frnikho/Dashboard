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
import {useEffect} from "react";
import {useCookies} from "react-cookie";
import {Link, Navigate} from "react-router-dom";
import {FaGoogle} from "react-icons/all";

const theme = createTheme();

export default function LoginPage(props) {

    const [cookies, setCookie] = useCookies();
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [successfullRedirect, setSuccessfullRedirect] = React.useState(false);

    useEffect(() => {
        app.get(`/user/${cookies['username']}`).then((response) => {
            if (response.data.username === cookies['username']) {
                setSuccessfullRedirect(true);
            }
        }).catch((error) => {
            console.log(error);
        });
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('username')) {
            setMessage("Username cannot be empty !");
            return setOpen(true);
        }
        if (!data.has('password')) {
            setMessage("Password cannot be empty !");
            return setOpen(true);
        }

        app.post("auth/login", {username: data.get('username'), password: data.get('password')}).then((response) => {
            if (response.status === 200) {
                setCookie('username', response.data.user.username, { path: '/' });
                setCookie('userId', response.data.user.id, { path: '/' });
                setSuccessfullRedirect(true);
            }
        }).catch((error) => {
            setOpen(true);
            try {
                setMessage(error.response.data.error);
            } catch (err) {
                setMessage("An error occurred, please try again later !");
            }
        });
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setMessage("");
    };

    const connectWithGoogle = () => {
        app.get('/auth/google').then((response) => {
            console.log(response);
        })
    }

    return (<div>
        {successfullRedirect === true && <Navigate to={"/"}/>}
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                            onClick={connectWithGoogle}
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

            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

        </ThemeProvider>
    </div>)
}