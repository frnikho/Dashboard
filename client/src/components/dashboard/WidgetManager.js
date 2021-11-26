import React from "react";
import WidgetNext5DaysForecast from "./widgets/WidgetNext5DaysForecast";
import NewWidgetCurrentWeather from "./widgets/NewWidgetCurrentWeather";
import Grid from "@mui/material/Grid";
import WidgetRandomMeme from "./widgets/WidgetRandomMeme";
import WidgetNYTimesMostPopular from "./widgets/WidgetNYTimesMostPopular";

export default class WidgetManager extends React.Component {

    showWidgets = () => {
        if (this.props.layout === undefined)
            return null;
        let type = this.props.layout.type;
        if (type === 'city_temperature')
            return <NewWidgetCurrentWeather onDelete={this.props.onDelete} config={this.props.config}/>
        if (type === 'next_5_days_forecast')
            return <WidgetNext5DaysForecast onDelete={this.props.onDelete} config={this.props.config}/>
        if (type === 'random_meme')
            return <WidgetRandomMeme onDelete={this.props.onDelete} config={this.props.config}/>
        if (type === 'most_popular_articles')
            return <WidgetNYTimesMostPopular onDelete={this.props.onDelete} config={this.props.config}/>
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