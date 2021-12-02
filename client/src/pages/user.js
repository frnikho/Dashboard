import React from "react";
import {Avatar, Box, Button, Container, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import app, {config} from "../config/axiosConfig";
import {Navigate} from "react-router-dom";
import {instanceOf} from "prop-types";
import {Cookies, withCookies} from "react-cookie";
import {TokenContext} from "../context/TokenContext";

class UserPage extends React.Component {

    static contextType = TokenContext;

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            createdAt: '',
            firstName: '',
            lastName: '',
            redirect: false,
            redirectUrl: ''
        }
        this.logout = this.logout.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.goToDashboard = this.goToDashboard.bind(this);
    }

    componentDidMount() {
        this.token = this.context;
        if (this.token === undefined)
            this.setState({redirect: true, redirectUrl: '/auth/login'});
        else
            this.getUserInfo();
    }

    getUserInfo() {
        const { cookies } = this.props;
        let username = cookies.get('username');

        app.get(`/user/${username}`, config(this.token)).then((response) => {
            this.setState({
                username: response.data.username,
                firstName: response.data.first_name,
                lastName: response.data.last_name,
                createdAt: response.data.created_date,
            })
        })
    }

    logout() {
        const {cookies} = this.props;
        try {
            cookies.remove('access_token', { path: '/' });
            cookies.remove('userId', { path: '/' });
            cookies.remove('username', { path: '/' });
            this.props.handleLogout();
            this.setState({redirect: true, redirectUrl: '/auth/login'});
        } catch (ex) {
        }
    }

    goToDashboard() {
        this.setState({redirect: true, redirectUrl: '/'});
    }

    getCreatedDateFormat () {
        let date = Date.parse(this.state.createdAt)
        let d = new Date(0);
        d.setUTCSeconds(date/1000);

        return "User created on " + d.toLocaleDateString() + " at " +  d.toLocaleTimeString();
    }

    render() {
        return(<div>
            {this.state.redirect === true && <Navigate to={this.state.redirectUrl}/>}
            <Paper elevation={0} />
            <Paper />
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={10} textAlign={"center"}>

                        <Box sx={{my: 3}}>
                            <Paper elevation={4}>
                                <Box sx={{p: 1}}>
                                    <Avatar sx={{ mx: 'auto', bgcolor: 'secondary.main' }}>
                                    </Avatar>
                                    <h1>{this.state.username}</h1>
                                    <h2>{this.state.firstName} {this.state.lastName}</h2>
                                    {this.getCreatedDateFormat()}
                                </Box>
                                <Box sx={{p: 2}}>
                                    <Button onClick={this.logout} variant="contained" color={"secondary"}>Logout</Button>
                                </Box>
                                <Box sx={{pb: 5}}>
                                    <Button onClick={this.goToDashboard} variant={"contained"} color={"primary"}>Go to dashboard</Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>)
    }
}

export default withCookies(UserPage);
