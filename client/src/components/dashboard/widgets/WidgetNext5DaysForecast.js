import React from "react";
import Widget from "./Widget";
import { CircularProgress, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import app, {config} from "../../../config/axiosConfig";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class WidgetNext5DaysForecast extends Widget {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    loadWidget = () => {
        if (this.props.config === undefined)
            return;
        app.get(`/services/openweather/next5daysforecast/${this.props.config.data.city.toLowerCase()}`, config(this.token)).then((response) => {
            this.setState({weather: response.data, loading: false});
        }).catch((err) => {
        });
    }

    onCountEnd() {
        this.loadWidget();
    }

    showWidget = () => {
        if (this.state.loading === true)
            return <CircularProgress />;
        return (
            <Carousel>
                {
                    this.state.weather.list.map((weather, i) => <this.Item key={i} weather={weather} city={this.state.weather.city.name} />)
                }
            </Carousel>
        );
    }

    Item = (props) => {
        let date = new Date(props.weather.dt_txt);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        return (
            <Paper variant="outlined" sx={{ maxHeight: 300, mx: 2 }}>
                <img alt="weather icon" src={"http://openweathermap.org/img/wn/" + props.weather.weather[0].icon + "@2x.png"} />
                <Typography variant="h6" gutterBottom component="div" fontWeight={"bold"}>{props.city}</Typography>
                <Typography variant="h6" gutterBottom component="div">{day} {monthNames[month - 1]} {year} {hour}:{(minutes < 10 ? '0' : '')}{minutes}</Typography>
                <Typography variant="p" gutterBottom component="div">{props.weather.main.temp}°</Typography>
                <Typography variant="p" gutterBottom component="div">{props.weather.main.temp_min}° / {props.weather.main.temp_max}°</Typography>
            </Paper>
        );
    }

    getWidgetSize() {
        return (5);
    }

    showContent() {
        return (this.showWidget());
    }

}