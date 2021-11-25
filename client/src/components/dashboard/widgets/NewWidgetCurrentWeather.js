import React from "react";
import Widget from "./Widget";
import app from "../../../config/axiosConfig";
import {FaCloud} from "react-icons/all";

export default class NewWidgetCurrentWeather extends Widget {

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
            this.setState({weather: response.data});
        }).catch((err) => {

        });
    }

    showContent() {
        return this.showWidget();
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
}