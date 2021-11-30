import React from "react";
import app, {config} from "../../../config/axiosConfig";
import Widget from "./Widget";
import { GoCalendar } from "react-icons/all";
import { Box, CircularProgress, Typography } from "@mui/material";

export default class WidgetCalendarificIsTodayAHoliday extends Widget {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.loadWidget();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        super.componentDidUpdate(prevProps, prevState, snapshot);
    }

    loadWidget = () => {
        if (this.props.config === undefined)
            return;

        app.get(`services/calendar/istodayaholiday`, config(this.token)).then((response) => {
            this.setState({ response: response.data, loading: false });
        }).catch((err) => {
            console.log(err);
            console.log(err.response);
        });
    }

    onCountEnd() {
        this.loadWidget();
    }

    showContent() {
        return this.showWidget();
    }

    getWidgetSize() {
        return (3);
    }

    showWidget = () => {
        if (this.state.loading === true)
            return <CircularProgress />;
        if (this.state.response.response.holidays.length === 0) {
            return (
                <Box>
                    <GoCalendar size={"40"} />
                    <Typography variant="h5" gutterBottom component="div" fontWeight={"bold"}>Today isn't a holiday. Be strong !!!</Typography>
                </Box>
            );
        } else {
            return (
                <Box>
                    <GoCalendar size={"40"} />
                    <Typography variant="h5" gutterBottom component="div" fontWeight={"bold"}>Today is {this.state.response.response.holidays[0].name}</Typography>
                </Box>
            );
        }
    }
}