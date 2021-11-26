import React from "react";
import app from "../../../config/axiosConfig";
import {FaShare, HiHeart} from "react-icons/all";
import {Box, Card, CardActions, CardContent, CardHeader, IconButton, Link, Typography} from "@mui/material";

export default class WidgetNYTimesMostPopular extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: undefined,
            timer: this.props.config?.timer || 30,
            defaultTimer: this.props.config?.timer || 30
        }
        this.intervalId = 0;
    }

    componentDidMount() {
        this.loadWidget();
        this.intervalId = setInterval(() => {
            if (this.state.timer === 1) {
                this.loadWidget();
                this.setState({timer: this.state.defaultTimer});
            } else {
                this.setState({timer: this.state.timer - 1});
            }
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.config !== prevProps.config) {
            if (prevProps.config === undefined)
                this.loadWidget();
            this.setState({timer: this.props.config.timer});
        }
    }

    loadWidget = () => {
        if (this.props.config === undefined)
            return;

        app.get(`/services/nytimes/mostpopular/${this.props.config.data.days}`).then((response) => {
            this.setState({articles: response.data});
        }).catch((err) => {
            console.log(err);
            console.log(err.response);
        });
    }

    showWidget = () => {
        if (this.state.articles === undefined)
            return;
        console.log(this.state.articles.results);
        const articles = this.state.articles.results.map((article, index) =>
            <div id={index}>
                <Typography variant="h6" gutterBottom component="div" fontWeight={"bold"}>{article.title}</Typography>
                <Typography variant="h6" gutterBottom component="div">{article.abstract}</Typography>
                <Typography variant="h6" gutterBottom component="div">
                    Read this article on
                    <Box style={{display: "inline"}}>
                        <Link href={article.url} underline="hover">nytimes.com</Link>
                    </Box>
                    .
                </Typography>
            </div>
                );
        //let articles = "";
        //for (let i = 0; i !== this.state.articles.results.lenght(); i++) {
            // articles += "<div>"
            // articles += "<Typography variant=\"h6\" gutterBottom component=\"div\" fontWeight={\"bold\"}>" + this.state.articles.results[i].title + "</Typography>"
            // articles += "<Typography variant=\"h6\" gutterBottom component=\"div\">" + this.state.articles.results[i].abstract + "</Typography>"
            // articles += "<Typography variant=\"h6\" gutterBottom component=\"div\">Read this article on <Box style={{display: \"inline\"}}><Link href=" + this.state.articles.results[i].url + + "underline=\"hover\">nytimes.com</Link></Box>.</Typography>"
            // articles += "<div>"
        //}
        return ({articles});
    }

    render() {
        return (
            <Card sx={{ maxWidth: 1245, mx: 5, minWidth: 800}}>
                <CardHeader/>
                <CardContent>
                    {this.showWidget()}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <HiHeart />
                    </IconButton>
                    <IconButton aria-label="share">
                        <FaShare />
                    </IconButton>
                    <Typography style={{marginLeft: 'auto'}} fontStyle={"italic"}>
                        {this.state.timer}
                    </Typography>
                </CardActions>
            </Card>
        );
    }
}