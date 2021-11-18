import React from "react";
import {Box, ButtonBase, Paper} from "@mui/material";
import Grid from "@mui/material/Grid";
class WidgetComponent extends React.Component {

    render() {
        return(
            <Grid item xs={2} sm={3} md={3}  alignItems="center" justify="center" textAlign={"center"}>
                <ButtonBase>
                    <Paper>
                        <Box sx={{mx: 4, p: 10}}>
                            <h1>Hello</h1>
                        </Box>
                    </Paper>
                </ButtonBase>
            </Grid>
        )
    }


}

export default WidgetComponent;