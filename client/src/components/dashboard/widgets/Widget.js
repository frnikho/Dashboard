import React from "react";
import {Card, CardActions, CardContent, IconButton, Typography} from "@mui/material";
import {FaEdit, FaTrash} from "react-icons/all";

export default class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timer: this.props.config?.timer || 30,
            defaultTimer: this.props.config?.timer || 30
        }
        this.intervalId = 0;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.config !== prevProps.config)
            this.setState({timer: this.props.config.timer});
    }

    componentDidMount() {
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

    onClickEdit = () => {

    }

    onClickDelete = () => {

    }

    render() {
        return (
            <Card sx={{ maxWidth: 345, mx: 2}}>
                <CardContent>
                    {this.showContent()}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="Edit">
                        <FaEdit size={"16"}/>
                    </IconButton>
                    <IconButton aria-label="Edit">
                        <FaTrash size={"16"}/>
                    </IconButton>
                    <Typography style={{marginLeft: 'auto'}} fontStyle={"italic"}>
                        {this.state.timer}
                    </Typography>
                </CardActions>
            </Card>
        )
    }
}