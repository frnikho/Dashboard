import React from "react";
import Widget from "./Widget";
import app from "../../../config/axiosConfig";
import {FaCloud} from "react-icons/all";
import {CircularProgress} from "@mui/material";

export default class NewWidgetCurrentWeather extends Widget {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }


    componentDidMount() {
        super.componentDidMount();
        this.loadWidget();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    loadWidget = () => {
        if (this.props.config === undefined)
            return;
        app.get(`/services/openweather/current/${this.props.config.data.city}`).then((response) => {
            this.setState({weather: response.data, loading: false});
            console.log("loaded widget current weather");
        }).catch((err) => {
            console.log("abcd");
        });
    }

    onCountEnd() {
        this.loadWidget();
    }

    showContent() {
        return this.showWidget();
    }

    getWidgetSize() {
        return (3);
    }

    showWidget = () => {
        if (this.state.loading === true)
            return <CircularProgress/>;
        return (
            <div>
                <FaCloud size={"40"}/>
                <h3>{this.state.weather.name}</h3>
                <h2>{this.state.weather.main.temp}°</h2>
                <h4>({this.state.weather.main.temp_min}° / {this.state.weather.main.temp_max}°)</h4>
            </div>
        )
    }
}