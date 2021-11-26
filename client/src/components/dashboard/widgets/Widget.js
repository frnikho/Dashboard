import React from "react";
import {Card, CardActions, CardContent, CircularProgress, IconButton, Typography} from "@mui/material";
import {FaEdit, FaTrash} from "react-icons/all";
import app from "../../../config/axiosConfig";

export default class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            config: props.config || undefined,
            timer: props.config?.timer || 30,
            defaultTimer: props.config?.timer || 30
        }
        this.intervalId = 0;
        this.widgetSize = 2;
        this.deleteWidget = this.deleteWidget.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.config !== prevProps.config && this.props.config !== undefined)
            return this.setState({timer: this.props.config.timer, defaultTimer: this.props.config.timer, config: this.props.config});
        if (prevProps !== this.props && this.props !== undefined) {
            if (prevProps.config !== this.props.config)
                this.loadWidget();
        }
    }

    loadWidget() {

    }

    deleteWidget = () => {
        console.log("abc")
        app.delete('/widgets',  {data: {widgetIndex: this.state.config.id}}).then((response) => {
            clearInterval(this.intervalId);
            this.props.onDelete(this.state.config);
        }).catch((error) => {
            console.log(error.response);
        });
    }

    componentDidMount() {
        this.props.setSize(this.getWidgetSize());
        this.intervalId = setInterval(() => {
            if (this.state.timer === 1) {
                this.setState({timer: this.state.defaultTimer});
                this.onCountEnd();
            } else {
                this.setState({timer: this.state.timer - 1});
            }
        }, 1000);
        this.onMount();
    }

    onCountEnd() {

    }

    onMount() {

    }

    showContent() {

    }

    onClickDelete = () => {
        this.deleteWidget();
    }

    getWidgetSize() {
        return 3;
    }

    getTimer() {
        if (this.state.timer === undefined || this.state.timer <= 0)
            return (<CircularProgress/>)
        return (<Typography style={{marginLeft: 'auto'}} fontStyle={"italic"}>
            {this.state.timer.toString()}
            {console.log("ABC", this.state.timer)}
        </Typography>)
    }

    render() {
        return (
            <Card sx={{ maxHeight: 400, mx: 2}}>
                <CardContent>
                    {this.showContent()}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Edit">
                        <FaEdit size={"16"}/>
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={() => this.onClickDelete()}>
                        <FaTrash size={"16"}/>
                    </IconButton>
                    {this.getTimer()}
                </CardActions>
            </Card>
        )
    }
}