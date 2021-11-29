import React from "react";
import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";
import app from "../../../config/axiosConfig";
import NewWidgetService from "./NewWidgetService";

export default class NewWidgetDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openNewDialog: this.props.openNewDialog,
            services: undefined,
        }
        this.onCloseAddDialog = this.onCloseAddDialog.bind(this);

        this.loadAvailableWidgets = this.loadAvailableWidgets.bind(this);
        this.showServicesAndWidget = this.showServicesAndWidget.bind(this);
        this.onClickNewWidget = this.onClickNewWidget.bind(this);

        this.showNewWidgetDialog = this.showNewWidgetDialog.bind(this);

    }

    loadAvailableWidgets = () => {
        app.get('/about.json').then((response) => {
            this.setState({services: response.data.server.services});
        }).catch((err) => {
            console.log(err.response);
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps === this.props)
            return;
        if (this.props.openNewDialog !== prevState.openNewDialog) {
            this.loadAvailableWidgets();
            this.setState({openNewDialog: this.props.openNewDialog});
        }
    }

    onCloseAddDialog = () => {
        this.props.close();
    }

    onClickNewWidget = (widget) => {
        this.props.onNewWidgetSelected(widget);
        this.setState({openNewDialog: false});
    }

    showServicesAndWidget = () => {
        if (this.state.services === undefined)
            return;
        return (
            <div>
                {this.state.services.map((service, key) => {
                    return (<NewWidgetService key={key} service={service} onClick={this.onClickNewWidget}/>)
                })}
            </div>
        )
    }

    showNewWidgetDialog = () => {
        return (<Dialog
            fullWidth={true}
            maxWidth={"lg"}
            open={this.state.openNewDialog}
            onClose={this.onCloseAddDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent>
                {this.showServicesAndWidget()}
            </DialogContent>
            <DialogActions>
                <Button onClick={this.onCloseAddDialog} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>)
    }


    render() {
        return (
            <div>
                {this.showNewWidgetDialog()}
            </div>
        )
    }


}