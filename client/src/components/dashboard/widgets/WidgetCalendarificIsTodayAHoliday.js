import React from "react";
import app from "../../../config/axiosConfig";
import Widget from "./Widget";
import { GoCalendar } from "react-icons/all";
import { Box, CircularProgress, Typography } from "@mui/material";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

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
        let date = new Date(this.props.config.data.date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        app.get(`services/calendar/istodayaholiday?year=${year}&month=${month}&day=${day}`).then((response) => {
            this.setState({ response: response.data, loading: false });
        }).catch((err) => {
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
            let date = new Date(this.props.config.data.date);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            return (
                <Box>
                    <GoCalendar size={"40"} />
                    <Typography variant="h5" gutterBottom component="div" fontWeight={"bold"}>{day} {monthNames[month - 1]} {year} isn't a holiday. Be strong !!!</Typography>
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