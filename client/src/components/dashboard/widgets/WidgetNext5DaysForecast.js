import React from "react";
import Widget from "./Widget";
import {FaSun} from "react-icons/all";
import app from "../../../config/axiosConfig";

export default class WidgetNext5DaysForecast extends Widget {

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
        app.get(`/services/openweather/next5daysforecast/${this.props.config.data.city}`).then((response) => {
            this.setState({weather: response.data});
        }).catch((err) => {

        });
    }

    showWidget = () => {
        if (this.state.weather === undefined)
            return null;
        return (<FaSun size={"40"}/>)
    }

    showContent() {
        return (this.showWidget());
    }

}