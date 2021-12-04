import React from "react";
import app, { config } from "../../../config/axiosConfig";
import Widget from "./Widget";
import { GoCalendar } from "react-icons/all";
import { CircularProgress, Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default class WidgetCalendarificHolidayOfYear extends Widget {

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

        app.get(`services/calendar/holidayofyear`, config(this.token)).then((response) => {
            this.setState({ response: response.data, loading: false });
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
        return (3);
    }

    showWidget = () => {
        if (this.state.loading === true)
            return <CircularProgress />;
        return (
            <Carousel>
                {
                    this.state.response.response.holidays.map((holiday, i) => {
                        return (
                            <Paper key={i} elevation={0} sx={{ maxHeight: 150, mx: 2 }}>
                                <GoCalendar size={"40"} />
                                <Typography variant="h6" gutterBottom component="div">On {holiday.date.datetime.day} {monthNames[holiday.date.datetime.month - 1]} {holiday.date.datetime.year}</Typography>
                                <Typography variant="h6" gutterBottom component="div" fontWeight={"bold"}>{holiday.name}</Typography>
                            </Paper>
                        );
                    })
                }
            </Carousel>
        );
    }
}