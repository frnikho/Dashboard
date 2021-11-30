import Grid from "@mui/material/Grid";
import NewWidgetComponent from "../components/dashboard/newWidgets/NewWidgetComponent";
import {Box, CircularProgress} from "@mui/material";
import React from "react";
import NewWidgetDialog from "../components/dashboard/newWidgets/NewWidgetDialog";
import NewWidgetSettingsDialog from "../components/dashboard/newWidgets/NewWidgetSettingsDialog";
import app, {config} from "../config/axiosConfig";
import WidgetManager from "../components/dashboard/WidgetManager";
import {Navigate} from "react-router-dom";
import {TokenContext} from "../context/TokenContext";

export default class DashboardPage extends React.Component {

    static contextType = TokenContext;

    constructor(props) {
        super(props);
        this.state = {
            redirectToLogin: false,
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
    }

    componentDidMount() {
        this.token = this.context;
        if (this.token === undefined)
            this.setState({redirectToLogin: true});
        else
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

    onWidgetDeleted = (widget) => {
        console.log(widget);

        this.state.config.forEach((config, index) => {
           if (config.id === widget.id)
               this.state.config.splice(index, 1);
        });

        this.state.layout.forEach((layout, index) => {
            if (layout.id === widget.id)
                this.state.layout.splice(index, 1);
        });

        this.setState({config: this.state.config, layout: this.state.layout});
    }

    loadWidgets = () => {
        app.get('/widgets/config', config(this.token)).then((response) => {
            this.setState({config: response.data.data});
            app.get('/user/layout', config(this.token)).then((response) => {
                this.setState({layout: response.data.layout, number: response.data.layout.length});
            }).catch((err) => {
                this.setState({redirectToLogin: true});
            });
        }).catch((err) => {
            this.setState({redirectToLogin: true});
        });
    }

    getConfigById = (id) => {
        if (this.state.config === undefined || this.state.config.length === 0)
            return undefined;

        for (let i = 0; i < this.state.config.length; i++) {
            if (this.state.config[i].id === id)
                return this.state.config[i];
        }
        return undefined;
    }

    showWidgets = () => {
        if (this.state.layout === undefined || this.state.config === undefined)
            return <CircularProgress/>;

/*        return (<ListManager
            items={this.state.layout}
            direction="horizontal"
            maxItems={3}
            render={item => <WidgetManager onDelete={this.onWidgetDeleted} layout={item} config={this.getConfigById(item.id)}/>}
            onDragEnd={() => {}}/>)*/

        return this.state.layout.map((layout, index) => {
            return (
                <WidgetManager onDelete={this.onWidgetDeleted} key={index} layout={layout} config={this.getConfigById(layout.id)}/>
            )
        });
    }

    redirectToLogin() {
        if (this.state.redirectToLogin === true)
            return (<Navigate to={"/auth/login"}/>)
    }

    render() {
        return (
            <div>
                {this.redirectToLogin()}
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