import Grid from "@mui/material/Grid";
import NewWidgetComponent from "../components/dashboard/newWidgets/NewWidgetComponent";
import {Box} from "@mui/material";
import React from "react";
import NewWidgetDialog from "../components/dashboard/newWidgets/NewWidgetDialog";
import NewWidgetSettingsDialog from "../components/dashboard/newWidgets/NewWidgetSettingsDialog";
import app from "../config/axiosConfig";
import WidgetManager from "../components/dashboard/WidgetManager";
import {getConfig} from "@testing-library/react";

export default class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openAddDialog: false,
            openSettingsDialog: false,
            newWidget: {},
            layout: undefined,
            config: undefined,
            number: 0
        }
        this.onClickAdd = this.onClickAdd.bind(this);
        this.onClickNewWidget = this.onClickNewWidget.bind(this);

        this.onCloseWidgetDialog = this.onCloseWidgetDialog.bind(this);
        this.onCloseSettingsDialog = this.onCloseSettingsDialog.bind(this);
        this.onNewWidgetCreated = this.onNewWidgetCreated.bind(this);
        this.loadWidgets = this.loadWidgets.bind(this);
        this.showWidgets = this.showWidgets.bind(this);

        this.loadTimers = this.loadTimers.bind(this);
        this.loadWidgetsConfig = this.loadWidgetsConfig.bind(this);
    }

    componentDidMount() {
        this.loadWidgets();
        this.loadWidgetsConfig();
        this.loadTimers();
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
            this.setState({layout: response.data.layout, number: response.data.layout.length});
        }).catch((err) => {
            console.log(err.response);
        });
    }

    loadWidgetsConfig = () => {
        app.get('/widgets/config').then((response) => {
            this.setState({config: response.data.data});
        }).catch((err) => {
           console.log(err.response);
        });
    }

    loadTimers = () => {
        app.get('/timers').then((response) => {
            this.setState({timers: response.data});
        }).catch((err) => {
            console.log(err.response);
        })
    }

    getConfigById = (id) => {
        if (this.state.config === undefined || this.state.config.length === 0)
            return undefined;

        console.log("OUI");
        console.log(this.state.config);

        for (let i = 0; i < this.state.config.length; i++) {
            if (this.state.config[i].id === id)
                return this.state.config[i];
        }
        return undefined;
    }

    showWidgets = () => {
        if (this.state.layout === undefined)
            return;
        return this.state.layout.map((layout, index) => {
            return (
                <WidgetManager key={index} layout={layout} config={this.getConfigById(layout.id)}/>
            )
        });
    }


    render() {
        return (
            <div>
                <NewWidgetDialog openNewDialog={this.state.openAddDialog} onNewWidgetSelected={this.onClickNewWidget} close={this.onCloseWidgetDialog}/>
                <NewWidgetSettingsDialog number={this.state.number} onNewWidgetCreated={this.onNewWidgetCreated} open={this.state.openSettingsDialog} widget={this.state.newWidget} close={this.onCloseSettingsDialog}/>
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