import React from "react";
import OauthPopup from "react-oauth-popup";
import env from "react-dotenv";
import {Button} from "@mui/material";
import app, {config} from "../../config/axiosConfig";
import {TokenContext} from "../../context/TokenContext";
import {BiCheck} from "react-icons/all";

const REDIRECT_URL = "http://localhost:3000/spotify/redirect"

export default class SpotifyOauthPopup extends React.Component {

    static contextType = TokenContext

    constructor(props) {
        super(props);
        this.state = {
            logged: false,
        }
    }

    componentDidMount() {
        this.token = this.context;
    }

    onReceiveCode = (code, params) => {
        app.post('/services/spotify', {code: code}, config(this.token)).then((response) => {
            if (response.status === 200) {
                this.setState({logged: true});
                this.props.handleLogin(response.data);
            }
        }).catch((err) => {
            console.log(err.response);
            this.props.errorLogin(err.response.data);
        });
    }

    getURL = () => {
        let clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        return `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=user-read-private%20user-read-recently-played%20user-modify-playback-state%20user-read-playback-state&redirect_uri=${REDIRECT_URL}`;
    }

    onClose = () => {

    }

    showComponent = () => {
        if (this.state.logged === false) {
            return (
                <OauthPopup url={this.getURL()} onClose={this.onClose} onCode={this.onReceiveCode} title={"Dashboard - Spotify login"}>
                    <Button>Login with spotify</Button>
                </OauthPopup>
            )
        } else {
            return <Button disabled={true}>You're logged  <BiCheck/></Button>
        }
    }

    render() {
        return this.showComponent();
    }


}