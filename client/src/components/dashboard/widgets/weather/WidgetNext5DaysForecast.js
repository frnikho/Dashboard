import React from "react";
import Widget from "../Widget";
import { CircularProgress, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import app, {config} from "../../../../config/axiosConfig";

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
        console.log("request")
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
                    this.state.weather.list.map((weather, i) => {
                        let date = new Date(weather.dt_txt);
                        let year = date.getFullYear();
                        let month = date.getMonth() + 1;
                        let day = date.getDate();
                        let hour = date.getHours();
                        let minutes = date.getMinutes();
                        return (
                            <Paper key={i} elevation={0} sx={{ maxHeight: 400, mx: 2 }}>
                                <img alt="weather icon" src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} />
                                <Typography variant="h6" gutterBottom component="div" fontWeight={"bold"}>{this.state.weather.city.name}</Typography>
                                <Typography variant="h6" gutterBottom component="div">{day} {monthNames[month - 1]} {year} {hour}:{(minutes < 10 ? '0' : '')}{minutes}</Typography>
                                <Typography variant="p" gutterBottom component="div">{weather.main.temp}°</Typography>
                                <Typography variant="p" gutterBottom component="div">{weather.main.temp_min}° / {weather.main.temp_max}°</Typography>
                            </Paper>
                        );
                    }
                )
                }
            </Carousel>
        );
    }

    getWidgetSize() {
        return (5);
    }

    showContent() {
        return (this.showWidget());
    }
}