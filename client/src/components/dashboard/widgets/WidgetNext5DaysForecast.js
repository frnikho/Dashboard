import React from "react";
import Widget from "./Widget";
import {FaSun} from "react-icons/all";
import app from "../../../config/axiosConfig";

export default class WidgetNext5DaysForecast extends Widget {

    constructor(props) {
        super(props);
        console.log(props);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
        this.loadWidget();
    }

    loadWidget = () => {
        if (this.props.config === undefined)
            return;
        app.get(`/services/openweather/next5daysforecast/${this.props.config.data.city}`).then((response) => {
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
                <FaSun size={"40"}/>
            </div>
        )
    }

    showContent() {
        return this.showWidget();
    }

}