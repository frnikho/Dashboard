import React from "react";
import Widget from "./Widget";
import app from "../../../config/axiosConfig";

export default class WidgetRandomMeme extends Widget {

    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    onCountEnd() {
        this.loadWidget();
    }

    loadWidget = () => {
        app.get('/services/meme').then((response) => {
            this.setState({url: response.data.url});
            console.log(response.data.url);
        }).catch((err) => {
            console.log(err.response);
        })
    }

    showContent() {
        return (
            <img src={this.state.url || ""} height={300} alt={""}/>
        )
    }

}