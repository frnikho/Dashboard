import React from "react";
import app from "../../../config/axiosConfig";
import {FaCloud, FaShare, HiHeart} from "react-icons/all";
import {Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";

export default class WidgetCurrentWeather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: undefined,
            timer: this.props.config?.timer || 30,
            defaultTimer: this.props.config?.timer || 30
        }
        this.intervalId = 0;
    }

    componentDidMount() {
        this.loadWidget();
        this.intervalId = setInterval(() => {
            if (this.state.timer === 1) {
                this.loadWidget();
                this.setState({timer: this.state.defaultTimer});
            } else {
                this.setState({timer: this.state.timer - 1});
            }
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.config !== prevProps.config) {
            if (prevProps.config === undefined)
                this.loadWidget();
            this.setState({timer: this.props.config.timer});
        }
    }

    loadWidget = () => {
        if (this.props.config === undefined)
            return;
        app.get(`/services/openweather/current/${this.props.config.data.city}`).then((response) => {
            this.setState({weather: response.data});
        }).catch((err) => {
            console.log(err);
            console.log(err.response);
        });
    }

    showWidget = () => {
        if (this.state.weather === undefined)
            return;
        return (
            <div>
                <FaCloud size={"40"}/>
                <h3>{this.state.weather.name}</h3>
                <h2>{this.state.weather.main.temp}°</h2>
                <h4>({this.state.weather.main.temp_min}° / {this.state.weather.main.temp_max}°)</h4>
            </div>
        )
    }

    render() {
        return (
            <Card sx={{ maxWidth: 1245, mx: 5, minWidth: 800}}>
                <CardHeader/>
                <CardContent>
                    {this.showWidget()}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <HiHeart />
                    </IconButton>
                    <IconButton aria-label="share">
                        <FaShare />
                    </IconButton>
                    <Typography style={{marginLeft: 'auto'}} fontStyle={"italic"}>
                        {this.state.timer}
                    </Typography>
                </CardActions>
            </Card>
        );
    }
}