import React from "react";
import WidgetNext5DaysForecast from "./widgets/WidgetNext5DaysForecast";
import NewWidgetCurrentWeather from "./widgets/NewWidgetCurrentWeather";
import Grid from "@mui/material/Grid";
import WidgetRandomMeme from "./widgets/WidgetRandomMeme";
import WidgetNYTimesMostPopular from "./widgets/WidgetNYTimesMostPopular";
import WidgetNYTimesTopStories from "./widgets/WidgetNYTimesTopStories";
import WidgetCalendarificIsTodayAHoliday from "./widgets/WidgetCalendarificIsTodayAHoliday";
import WidgetCalendarificHolidayOfYear from "./widgets/WidgetCalendarificHolidayOfYear";
import WidgetSpotifyUserInformation from "./widgets/spotify/WidgetSpotifyUserInformation";
import WidgetSpotifyController from "./widgets/spotify/WidgetSpotifyController";
import WidgetSpotifyNewReleases from "./widgets/spotify/WidgetSpotifyNewReleases";

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
            return;
        let type = this.props.layout.type;
        if (type === 'city_temperature')
            return <NewWidgetCurrentWeather setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config} />
        if (type === 'next_5_days_forecast')
            return <WidgetNext5DaysForecast setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config} />
        if (type === 'random_meme')
            return <WidgetRandomMeme setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config} />
        if (type === 'most_popular_articles')
            return <WidgetNYTimesMostPopular setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config} />
        if (type === 'top_stories_articles')
            return <WidgetNYTimesTopStories setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config} />
        if (type === 'is_today_a_holiday')
            return <WidgetCalendarificIsTodayAHoliday setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config} />
        if (type === 'holiday_of_year')
            return <WidgetCalendarificHolidayOfYear setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config} />
        if (type === 'user_information')
            return <WidgetSpotifyUserInformation setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config}/>
        if (type === 'spotify_player_control')
            return <WidgetSpotifyController setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config}/>
        if (type === 'spotify_new_releases')
            return <WidgetSpotifyNewReleases setSize={this.setWidgetSize} onDelete={this.props.onDelete} config={this.props.config}/>
    }

    render() {
        return (
                this.props.layout !== undefined && <Grid item xs={this.state.size} sm={this.state.size} md={this.state.size} alignItems="center" justify="center" textAlign={"center"}>
                    {this.showWidgets()}
                </Grid>


        );
    }

}