import React from "react";
import app, { config } from "../../../config/axiosConfig";
import Widget from "./Widget";
import { TiNews } from "react-icons/all";
import { Box, CircularProgress, Link, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default class WidgetNYTimesTopStories extends Widget {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
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

        app.get(`/services/nytimes/topstories/${this.props.config.data.subject}`, config(this.token)).then((response) => {
            this.setState({ articles: response.data, loading: false });
        }).catch((err) => {
        });
    }

    onCountEnd() {
        this.loadWidget();
    }

    showContent() {
        return this.showWidget();
    }

    getWidgetSize() {
        return (5);
    }

    showWidget = () => {
        if (this.state.loading === true)
            return <CircularProgress />;
        return (
            <Carousel>
                {
                    this.state.articles.results.map((article, i) => {
                        return (
                            <Paper key={i} elevation={0} sx={{ maxHeight: 150, mx: 2 }}>
                                <TiNews size={"20"} /><Typography variant="h6" gutterBottom component="div" style={{ display: "inline" }}> {this.props.config.data.subject.toUpperCase()} </Typography><TiNews size={"20"} />
                                <Typography variant="h6" gutterBottom component="div" fontWeight={"bold"}>{article.title}</Typography>
                                <Typography variant="p" gutterBottom component="div">{article.abstract.substring(0, 70)}...</Typography>
                                <Typography variant="p" gutterBottom component="div">
                                    Read this article on <Box style={{ display: "inline" }}><Link href={article.url} underline="hover">nytimes.com</Link></Box>.
                                </Typography>
                            </Paper>
                        );
                    })
                }
            </Carousel>
        );
    }
}