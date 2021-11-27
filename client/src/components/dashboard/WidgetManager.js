import React from "react";
import WidgetNext5DaysForecast from "./widgets/WidgetNext5DaysForecast";
import NewWidgetCurrentWeather from "./widgets/NewWidgetCurrentWeather";
import Grid from "@mui/material/Grid";
import WidgetRandomMeme from "./widgets/WidgetRandomMeme";
import WidgetNYTimesMostPopular from "./widgets/WidgetNYTimesMostPopular";

export default class WidgetManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 2
        }
    }

    setWidgetSize = (size) => {
        this.setState({
            size: size
        });
    }

    showWidgets = () => {
        if (this.props.layout === undefined)
            return null;
        let type = this.props.layout.type;
        if (type === 'city_temperature')
            return <NewWidgetCurrentWeather setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config}/>
        if (type === 'next_5_days_forecast')
            return <WidgetNext5DaysForecast setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config}/>
        if (type === 'random_meme')
            return <WidgetRandomMeme setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config}/>
        if (type === 'most_popular_articles')
            return <WidgetNYTimesMostPopular setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config}/>
        if (type === 'holiday_of_year')
            return <div/>
    }

    render() {
        return (
            <Grid item xs={this.state.size} sm={this.state.size} md={this.state.size}  alignItems="center" justify="center" textAlign={"center"}>
                {this.showWidgets()}
            </Grid>
        );
    }

}