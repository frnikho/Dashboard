import React from "react";
import Widget from "../Widget";
import app, {config} from "../../../../config/axiosConfig";
import Lottie from "lottie-react";
import Carousel from "react-material-ui-carousel";
import spotify_launch from "../../../../animations/spotify-launch.json"
import {Box, Button, createTheme, IconButton, Popover, ThemeProvider, Typography} from "@mui/material";
import {FaLink} from "react-icons/all";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
    },});

export default class WidgetSpotifyNewReleases extends Widget {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            albums: false,
            anchorEl: null,
            selectedAlbum: undefined,
        }
        this.openPopover = this.openPopover.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    onCountEnd() {
        this.loadWidget();
    }

    loadWidget() {
        app.get('/services/spotify/releases', config(this.token)).then((response) => {
            this.setState({albums: response.data.albums.items, loading: false})
        }).catch((err) => {
            console.log(err.response.data);
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    showCarousel() {
        if (this.state.loading === true) {
            return (<Lottie animationData={spotify_launch} style={{height: 125}}/>)
        }
        if (this.state.albums === undefined)
            return <div/>;

        return (
            <Carousel
                indicators={false}
                navButtonsAlwaysVisible={true}
                onChange={() => this.setState({anchorEl: null})}
                interval={8000}
            animation={"slide"}
            duration={100}>
                {this.state.albums.map((album, index) => {
                    return (<div>
                        <img onClick={(e) => this.openPopover(e, album)} width={300} key={index} src={album.images[0].url} alt={"album"}/>
                        <h4>{album.name}</h4>
                        <h4>({album.album_type})</h4>
                    </div>)
                })}
            </Carousel>
        )
    }

    openPopover(event, album) {
        this.setState({anchorEl: event.currentTarget, selectedAlbum: album});
    }

    handlePopoverClose() {
        this.setState({anchorEl: null});
    }

    showAlbumInfo() {
        if (this.state.selectedAlbum === undefined)
            return;

        let album = this.state.selectedAlbum;

        return (
            <Box sx={{p: 2}} textAlign={"center"}>
                <h3>{album.name} ({album.album_type})</h3>
                <Typography color={"gray"}>
                    {album.artists[0].name}
                </Typography>
                <Button onClick={() => window.open(album.external_urls.spotify)}>
                    {album.name}
                </Button>
                <h4>Release date: {album.release_date}</h4>
                <h4>Total tracks: {album.total_tracks}</h4>
                <IconButton>
                    <FaLink onClick={() => window.open(album.external_urls.spotify)}/>
                </IconButton>
            </Box>
        )
    }

    showContent() {
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return (
            <ThemeProvider theme={theme}>
                <Box sx={{pt: 2, pb: 4, px: 4}} textAlign={"start"}>
                    <Typography variant={"h4"} fontWeight={900}>New Releases</Typography>
                </Box>
                {this.showCarousel()}
                <Popover
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    id={id}
                    open={open}
                    anchorEl={this.state.anchorEl}
                    onClose={this.handlePopoverClose}>
                        <Box>
                            {this.showAlbumInfo()}
                        </Box>
                </Popover>
            </ThemeProvider>)
    }

}