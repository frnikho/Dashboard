import React from "react";
import Widget from "../Widget";
import app, {config} from "../../../../config/axiosConfig";
import {BiPause, BiPlay, BiRepeat, BiShuffle, BiSkipNext, BiSkipPrevious} from "react-icons/all";
import {Box, LinearProgress} from "@mui/material";

function sec2time(timeInSeconds) {
    let pad = function(num, size) { return ('000' + num).slice(size * -1); },
        time = parseFloat(timeInSeconds).toFixed(3),
        minutes = Math.floor(time / 60) % 60,
        seconds = Math.floor(time - minutes * 60);
    return pad(minutes, 2) + ':' + pad(seconds, 2);
}

export default class WidgetSpotifyController extends Widget {

    constructor(props) {
        super(props);
        this.state = {
            playing: true,
            shuffle: true,
            repeat: true
        }
        this.pause = this.pause.bind(this);
        this.play = this.play.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.repeat = this.repeat.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    loadWidget() {
        app.get('/services/spotify/player', config(this.token)).then(response => {
            this.setState({status: response.data, playing: response.data.is_playing, shuffle: response.data.shuffle_state, repeat: response.data.repeat_state});
        }).catch((err) => {
            console.log(err.response);
        })
    }

    pause() {
        app.post('/services/spotify/player', {control: 'pause'}, config(this.token)).then(() => {
            this.setState({playing: false});
        }).catch((err) => {
            console.log(err.response);
        });
    }

    play() {
        app.post('/services/spotify/player', {control: 'play'}, config(this.token)).then(() => {
            this.setState({playing: true});
        }).catch((err) => {
            console.log(err.response);
        });
    }

    next() {
        app.post('/services/spotify/player', {control: 'next'}, config(this.token)).then(() => {

        }).catch((err) => {
            console.log(err.response);
        });
    }

    onCountEnd() {
        this.loadWidget();
    }

    previous() {
        app.post('/services/spotify/player', {control: 'previous'}, config(this.token)).then(() => {

        }).catch((err) => {
            console.log(err.response);
        });
    }

    shuffle(state) {
        app.post('/services/spotify/player', {control: 'shuffle', state}, config(this.token)).then(() => {
            this.setState({shuffle: !state});
        }).catch((err) => {
            console.log(err.response);
        });
    }

    repeat(state) {
        app.post('/services/spotify/player', {control: 'repeat', state}, config(this.token)).then(() => {
            this.setState({repeat: state !== "off"});
        }).catch((err) => {
            console.log(err.response);
        });
    }

    showRepeat() {
        if (this.state.status === undefined)
            return;
        return (<BiRepeat color={this.state.repeat !== "off" ? "blue" : "black"} size={30} onClick={() => this.repeat(this.state.repeat ? "off" : "track")}/>);
    }

    showShuffle() {
        if (this.state.status === undefined)
            return;
        return (<BiShuffle color={this.state.shuffle === true ? "blue" : "black"} size={30} onClick={() => this.shuffle(!this.state.shuffle)}/>)
    }

    showAdvancedControl() {
        return (<Box sx={{p: 2}}>
            {this.showRepeat()}
            {this.showShuffle()}
        </Box>)
    }

    showItem() {
        if (this.state.status === undefined || this.state.status.item === undefined)
            return;

        let item = this.state.status.item;
        let album = this.state.status.item.album;

        let max = item.duration_ms;
        let current = this.state.status.progress_ms;

        return (
            <div>
                <img src={album.images[0].url} width={200}/>
                <h3>{item.name}</h3>
                <h4>{album.name}</h4>
                <Box sx={{m: 2}}>
                    <LinearProgress variant="determinate" value={current/max*100}/>
                    <p>{sec2time(Math.floor(current/1000))}</p>
                </Box>
            </div>
        )
    }

    showContent() {
        return (
            <div>
                <div>
                    {this.showItem()}
                </div>
                <Box>
                    <BiSkipPrevious onClick={this.previous} size={50}/>
                    {this.state.playing ? <BiPause size={50} onClick={this.pause}/> : <BiPlay size={50} onClick={this.play}/>}
                    <BiSkipNext onClick={this.next} size={50}/>
                </Box>
                {this.showAdvancedControl()}
            </div>
        );
    }

}