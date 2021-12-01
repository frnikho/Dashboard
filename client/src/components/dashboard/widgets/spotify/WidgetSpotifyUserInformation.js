import React from "react";
import Widget from "../Widget";
import {CircularProgress, IconButton} from "@mui/material";
import app, {config} from "../../../../config/axiosConfig";
import {BiCheck, BiLink, FaCross, FaSpotify} from "react-icons/all";

export default class WidgetSpotifyUserInformation extends Widget {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            user: undefined,
        };
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    loadWidget() {
        app('/services/spotify/userinfo', config(this.token)).then((result) => {
            console.log(result);
            this.setState({user: result.data, loading: false})
        }).catch((err) => {
           console.log(err.response);
        });
    }

    showContent() {
        if (this.state.loading === true)
            return <CircularProgress/>
        return (
            <div>
                <FaSpotify size={40}/>
                <h2>{this.state.user.display_name}</h2>
                <h3>Followers: {this.state.user.followers.total}</h3>
                <h3>Premium: {this.state.user.product === "premium" ? <BiCheck size={26}/> : <FaCross size={26}/>}</h3>
                <h4><IconButton onClick={() => window.open(this.state.user.external_urls.spotify)}><BiLink size={40}/></IconButton></h4>
            </div>
        );
    }

}