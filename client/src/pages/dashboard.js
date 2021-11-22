import Grid from "@mui/material/Grid";
import NewWidgetComponent from "../components/dashboard/newWidgets/NewWidgetComponent";
import {Box} from "@mui/material";
import React from "react";
import NewWidgetDialog from "../components/dashboard/newWidgets/NewWidgetDialog";
import NewWidgetSettingsDialog from "../components/dashboard/newWidgets/NewWidgetSettingsDialog";
import app from "../config/axiosConfig";
import WidgetCard from "../components/dashboard/widgets/WidgetCard";

export default class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openAddDialog: false,
            openSettingsDialog: false,
            newWidget: {},
            layout: undefined,
        }
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickNewWidget = this.onClickNewWidget.bind(this);

        this.onCloseWidgetDialog = this.onCloseWidgetDialog.bind(this);
        this.onCloseSettingsDialog = this.onCloseSettingsDialog.bind(this);
        this.onNewWidgetCreated = this.onNewWidgetCreated.bind(this);
        this.loadWidgets = this.loadWidgets.bind(this);
        this.showWidgets = this.showWidgets.bind(this);

        this.onDragDrop = this.onDragDrop.bind(this);

    }

    componentDidMount() {
        this.loadWidgets();
    }

    onClickAdd = () => {
        this.setState({openAddDialog: true});
    }

    onClickNewWidget = (widget) => {
        this.setState({openAddDialog: false, openSettingsDialog: true, newWidget: widget});
    }

    onCloseWidgetDialog = () => {
        this.setState({openAddDialog: false, openSettingsDialog: false});
    }

    onCloseSettingsDialog = () => {
        this.setState({openAddDialog: false, openSettingsDialog: false});
    }

    onNewWidgetCreated = (widget) => {
        this.setState({openAddDialog: false, openSettingsDialog: false});
        this.loadWidgets();
    }

    loadWidgets = () => {
        app.get('/user/layout').then((response) => {
            this.setState({layout: response.data.layout});
        }).catch((err) => {
            console.log(err.response);
        });
    }

    loadWidgetsConfig = () => {

    }

    showWidgets = () => {
        if (this.state.layout === undefined)
            return;
        return this.state.layout.map((layout, index) => {
            return (
                <WidgetCard key={index} widget={{name: layout}}/>
            )
        });
    }

    onDragDrop = (result) => {

    }

    render() {
        return (
            <div>
                <NewWidgetDialog openNewDialog={this.state.openAddDialog} onNewWidgetSelected={this.onClickNewWidget} close={this.onCloseWidgetDialog}/>
                <NewWidgetSettingsDialog onNewWidgetCreated={this.onNewWidgetCreated} open={this.state.openSettingsDialog} widget={this.state.newWidget} close={this.onCloseSettingsDialog}/>
                <Box sx={{my: 5}}>
                    <Grid container spacing={{ xs: 2, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {this.showWidgets()}
                        <NewWidgetComponent onClickAdd={this.onClickAdd} />
                    </Grid>
                </Box>
            </div>
        );
    }
}