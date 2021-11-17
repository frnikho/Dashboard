import React from "react";
import {instanceOf} from "prop-types";
import {Cookies} from "react-cookie";
import TopbarComponent from "../components/topbar/TopbarComponent";
import {Avatar, Box, Container, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";

class UserPage extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            createdAt: '',
        }
    }

    render() {
        return(<div>
            <TopbarComponent/>
            <Paper elevation={0} />
            <Paper />
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={10} textAlign={"center"}>
                       <Box sx={{
                           my: 2,
                           display: 'flex',
                           flexDirection: 'column',
                           alignItems: 'center',
                       }}>
                           <Paper elevation={4}>
                               <Box sx={{p: 1}}>
                                   <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                   </Avatar>
                                   <h1>Hello</h1>
                               </Box>
                           </Paper>
                       </Box>
                        <Box sx={{my: 3}}>
                            <Paper elevation={4}>
                                <Box sx={{p: 1}}>
                                    <h1>Hello</h1>
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