import React from "react";
import {Card, CardActions, CardContent, CircularProgress, IconButton, Typography} from "@mui/material";
import {FaEdit, FaTrash} from "react-icons/all";
import app from "../../../config/axiosConfig";
import {TokenContext} from "../../../context/TokenContext";

const DEFAULT_TIMER = 30;

export default class Widget extends React.Component {

    static contextType = TokenContext;

    constructor(props) {
        super(props);
        this.state = {
            config: props.config || undefined,
            timer: this.props.config.timer,
            maxHeight: 400,
            maxWidth: 400
        }
        this.intervalId = 0;
        this.widgetSize = 2;
        this.deleteWidget = this.deleteWidget.bind(this);
        this.loadWidget = this.loadWidget.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState !== this.state)
            this.updateTimer();
        if (prevProps.config !== this.props.config)
            console.log("Props update");
    }

    loadWidget() {

    }

    deleteWidget = () => {
        app.delete('/widgets',  {data: {widgetIndex: this.state.config.id}}).then((response) => {
            clearInterval(this.intervalId);
            this.props.onDelete(this.state.config);
        }).catch((error) => {
            console.log(error.response);
        });
    }

    componentDidMount() {
        this.token = this.context;
        this.props.setSize(this.getWidgetSize());
        if (this.props.config !== undefined) {
            this.setState({
                config: this.props.config,
                timer: this.props.config?.timer || DEFAULT_TIMER,
            })
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
                this.setState({timer: 30});
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

    getWidgetSize() {
        return 3;
    }

    getTimer() {
        if (this.state.timer === undefined || this.state.timer <= 0)
            return (<CircularProgress/>)
        return (<Typography style={{marginLeft: 'auto'}} fontStyle={"italic"}>
            {this.state.timer?.toString() || "error"}
        </Typography>)
    }

    render() {
        return (
            <Card>
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