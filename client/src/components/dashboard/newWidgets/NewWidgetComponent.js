import React from "react";
import AddIcon from '@mui/icons-material/Add';
import {Box, ButtonBase, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";

export default class NewWidgetComponent extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.onClickAdd();
    }

    render() {
        return (
            <Grid item xs={2} sm={3} md={3}  alignItems="center" justify="center" textAlign={"center"}>
                <ButtonBase>
                    <Paper onClick={this.handleClick}>
                        <Box sx={{mx: 4, p: 10}}>
                            <AddIcon/>
                        </Box>
                    </Paper>
                </ButtonBase>
            </Grid>)
    }
}