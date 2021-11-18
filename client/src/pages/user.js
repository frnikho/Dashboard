import React from "react";
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";
import TopbarComponent from "../components/topbar/TopbarComponent";
import {Avatar, Box, Button, Container, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
import app from "../config/axiosConfig";
import {Navigate} from "react-router-dom";

class UserPage extends React.Component {

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
            redirectLogout: false
        }
        this.logout = this.logout.bind(this);
    }

    logout() {
        app.post('/auth/logout').then((response) => {
            this.setState({redirectLogout: true})
        }).catch((err) => {
            this.setState({redirectLogout: true})
        })
    }

    render() {
        return(<div>
            {this.state.redirectLogout === true && <Navigate to={"/auth/login"}/>}
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
                                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    </Avatar>
                                    <h1>Hello</h1>
                                </Box>
                                <Box sx={{pb: 5, my: 5}}>
                                    <Button onClick={this.logout} variant="contained" color={"secondary"}>Logout</Button>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>)
    }
}

export default UserPage;