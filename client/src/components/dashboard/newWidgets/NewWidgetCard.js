import React from "react";
import {Box, ButtonBase, Card, CardContent, Typography} from "@mui/material";

export default class NewWidgetCard extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

    }

    handleClick = () => {
        this.props.onClick(this.props.widget);
    }


    render() {
        return (
            <ButtonBase onClick={this.handleClick}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} color="text.primary" gutterBottom>
                            {this.props.widget.displayName}
                        </Typography>
                        <Box sx={{my: 2}}>
                            <Typography variant="body2">
                                {this.props.widget.description}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </ButtonBase>
        )
    }
}