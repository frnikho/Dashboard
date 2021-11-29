import React from "react";
import app from "../../../config/axiosConfig";
import Widget from "./Widget";
import { TiNews } from "react-icons/all";
import { Box, Button, Link, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default class WidgetNYTimesMostPopular extends Widget {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    loadWidget = () => {
        if (this.props.config === undefined)
            return;

        app.get(`/services/nytimes/mostpopular/${this.props.config.data.days}`).then((response) => {
            this.setState({ articles: response.data });
        }).catch((err) => {
            console.log(err);
            console.log(err.response);
        });
    }

    showContent() {
        return this.showWidget();
    }

    getWidgetSize() {
        return (5);
    }

    showWidget = () => {
        if (this.state.articles === undefined)
            return;
        return (
            <Carousel>
                {this.state.articles.results.map((article, i) => <this.Item key={i} article={article} />)}
            </Carousel>
        );
    }

    Item = (props) => {
        return (
            <Paper variant="outlined" sx={{ maxHeight: 150, mx: 2}}>
                <TiNews size={"20"} />
                <Typography variant="h6" gutterBottom component="div" fontWeight={"bold"}>{props.article.title}</Typography>
                <Typography variant="p" gutterBottom component="div">{props.article.abstract.substring(0, 70)}...</Typography>
                <Typography variant="p" gutterBottom component="div">
                    Read this article on <Box style={{ display: "inline" }}><Link href={props.article.url} underline="hover">nytimes.com</Link></Box>.
                </Typography>
            </Paper>
        );
    }
}