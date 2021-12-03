import React from "react";
import Widget from "./Widget";
import app, {config} from "../../../config/axiosConfig";
import {CircularProgress} from "@mui/material";

export default class WidgetRandomMeme extends Widget {

    constructor(props) {
        super(props);
        this.state = {
            url: undefined,
            error: undefined,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    onMount() {
        this.loadWidget();
    }

    onCountEnd() {
        this.loadWidget();
    }

    loadWidget() {
        app.get('/services/meme', config(this.token)).then((response) => {
            this.setState({url: response.data.url});
        }).catch((err) => {
            this.setState({url: undefined, error: err.response.data.error});
        })
    }

    showContent() {
        if (this.state.error !== undefined)
            return <h4>{this.state.error}</h4>
        if (this.state.url === undefined)
            return <CircularProgress />
        return (<img src={this.state.url} width={250} alt={""}/>)
    }

}