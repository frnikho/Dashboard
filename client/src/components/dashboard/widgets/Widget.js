import React from "react";
import {CardActions, CardContent, CircularProgress, IconButton, Paper, Typography} from "@mui/material";
import {BiInfinite, FaArrowLeft, FaArrowRight, FaTrash} from "react-icons/all";
import app, {config} from "../../../config/axiosConfig";
import {TokenContext} from "../../../context/TokenContext";

export default class Widget extends React.Component {

    static contextType = TokenContext;

    constructor(props) {
        super(props);
        this.state = {
            config: props.config || undefined,
            timer: this.props.config.timer,
            defaultTimer: this.props.config.timer,
            maxHeight: 400,
            maxWidth: 400
        }
        this.intervalId = 0;
        this.widgetSize = 2;
        this.deleteWidget = this.deleteWidget.bind(this);
        this.loadWidget = this.loadWidget.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state) {
            if (prevProps.config !== this.props.config) {
            }
        }

    }

    loadWidget() {

    }

    deleteWidget = () => {
       app.delete('/widgets',  {data: {widgetId: this.state.config.id}, headers: config(this.token).headers}).then((response) => {
            clearInterval(this.intervalId);
            this.props.onDelete(this.state.config);
        }).catch((error) => {

        });
    }

    componentDidMount() {
        this.token = this.context;
        this.props.setSize(this.getWidgetSize());
        if (this.props.config !== undefined) {
            this.setState({
                config: this.props.config,
                timer: this.props.config?.timer,
                defaultTimer: this.props.config?.timer,
            })
            this.updateTimer();
        }
        this.loadWidget();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    updateTimer() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            if (this.state.timer === 1) {
                this.setState({timer: this.state.defaultTimer});
                this.onCountEnd();
            } else {
                this.setState({timer: this.state.timer - 1});
            }
        }, 1000);
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

    moveWidget = (position) => {
        this.props.onChangePosition(this.state.config, position);
    }

    getWidgetSize() {
        return 3;
    }

    getTimer() {
        if (this.state.timer === undefined || this.state.timer <= 0)
            return (<CircularProgress/>)

        if (this.state.defaultTimer === 1)
            return <BiInfinite style={{marginLeft: 'auto'}}/>

        return (<Typography style={{marginLeft: 'auto'}} fontStyle={"italic"}>
            {this.state.timer?.toString() || "error"}
        </Typography>)
    }

    render() {
        return (
            <Paper elevation={3} style={{borderRadius: 10}} sx={{pt: 2}}>
                <CardContent>
                    {this.showContent()}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Delete" onClick={() => this.onClickDelete()}>
                        <FaTrash size={"16"}/>
                    </IconButton>
                    <IconButton aria-label="Prev" onClick={() => this.moveWidget(-1)}>
                        <FaArrowLeft size={"16"}/>
                    </IconButton>
                    <IconButton aria-label="Prev" onClick={() => this.moveWidget(0)}>
                        <FaArrowRight size={"16"}/>
                    </IconButton>
                    {this.getTimer()}
                </CardActions>
            </Paper>
        )
    }
}