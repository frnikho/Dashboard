import React from "react";
import {ThemeProvider} from "@emotion/react";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Checkbox,
    Container, createTheme,
    CssBaseline,
    FormControlLabel, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Link, Navigate} from "react-router-dom";
import app from "../../config/axiosConfig";
import register from "../../animations/register.json";
import Lottie from "lottie-react";

const theme = createTheme();

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: '',
            successRedirect: false,
            type: 'danger',
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {

    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get('firstName') === '') {
            return this.setState({open: true, message: "Invalid firstname !"});
        }

        if (data.get('lastName') === '') {
            return this.setState({open: true, message: "Invalid lastname !"});
        }

        if (data.get('username') === '') {
            return this.setState({open: true, message: "Invalid username !"});
        }

        if (data.get('password') === '') {
            return this.setState({open: true, message: "Invalid password !"});
        }

        app.post('/auth/register', {
            username: data.get('username'),
            password: data.get('password'),
            firstname: data.get('firstName'),
            lastname: data.get('lastName')
        }).then((response) => {
            if (response.status === 200) {
                this.setState({
                    type: 'success',
                    open: true,
                    message: 'User created, you will be redirect to the login page :O'
                    })
            }
        }).catch((err) => {
            if (err.response.status === 400) {
                this.setState({open: true, message: err.response.data.error});
            }
        })
    };

    handleClose(event, reason){
        if (reason === 'clickaway') {
            return;
        }
        if (this.state.type === 'success') {
            this.setState({successRedirect: true});
        } else {
            this.setState({open: false, message: ''});
        }
    };

    render() {
        return(
            <div>
                {this.state.successRedirect === true && <Navigate to={"/auth/login"}/>}
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

                            <Box sx={{mb: 2}}>
                                <Typography component="h1" variant="h4">
                                    Sign up
                                </Typography>
                            </Box>

                            <Lottie animationData={register} style={{height: 225}}/>

                            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/auth/login">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>

                        <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity={this.state.type} sx={{ width: '100%' }}>
                                {this.state.message}
                            </Alert>
                        </Snackbar>

                    </Container>
                </ThemeProvider>
            </div>
        );
    }
}

export default RegisterPage;