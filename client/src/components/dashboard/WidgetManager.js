import React from "react";
import Grid from "@mui/material/Grid";
import WidgetCurrentWeather from "./widgets/WidgetCurrentWeather";

export default class WidgetManager extends React.Component {

    showWidgets = () => {
        if (this.props.layout === undefined)
            return (<div/>);
        let type = this.props.layout.type;
        if (type === 'city_temperature')
            return <WidgetCurrentWeather config={this.props.config}/>
        if (type === 'next_5_days_forecast')
            return <div/>
        if (type === 'holiday_of_year')
            return <div/>
    }

    render() {
        return (
            <Grid item xs={2} sm={3} md={3}  alignItems="center" justify="center" textAlign={"center"}>
                {this.showWidgets()}
                {/*<ButtonBase>
                    <Paper>
                        <Box sx={{mx: 4, p: 10}}>
                            <CardContent>
                                <h3>{this.props.layout.name}</h3>
                            </CardContent>
                        </Box>
                    </Paper>
                </ButtonBase>*/}
            </Grid>
        );
    }

}