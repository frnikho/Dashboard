import React from "react";
import {Box, ButtonBase, CardContent, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";

export default class WidgetCard extends React.Component {

    render() {
        return (
            <Grid item xs={2} sm={3} md={3}  alignItems="center" justify="center" textAlign={"center"}>
                <ButtonBase>
                    <Paper>
                        <Box sx={{mx: 4, p: 10}}>
                            <CardContent>
                                <h3>{this.props.widget.name}</h3>
                            </CardContent>
                        </Box>
                    </Paper>
                </ButtonBase>
            </Grid>
        );
    }

}