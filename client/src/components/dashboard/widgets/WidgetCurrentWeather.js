import React from "react";
import app from "../../../config/axiosConfig";

export default class WidgetCurrentWeather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weather: undefined
        }
    }

    componentDidMount() {
        this.loadWidget();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("A", this.props.config);
        this.loadWidget();
    }

    loadWidget = () => {
        if (this.props.config === undefined)
            return;
        app.get(`/services/openweather/current/${this.props.config.data.city}`).then((response) => {
            console.log();
            this.setState({weather: response.data});
        });
    }

    showWidget = () => {
        if (this.state.weather === undefined)
            return;
        return (
            <div>
                <h4>{this.state.weather.name}</h4>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.showWidget()}
            </div>
        );
    }
}