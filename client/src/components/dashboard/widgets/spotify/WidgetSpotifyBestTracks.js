import React from "react";
import Widget from "../Widget";

export default class WidgetSpotifyBestTracks extends Widget {

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    loadWidget() {
        
    }

    onCountEnd() {
        this.loadWidget();
    }

    showContent() {
        return (
            <div>

        </div>);
    }

}