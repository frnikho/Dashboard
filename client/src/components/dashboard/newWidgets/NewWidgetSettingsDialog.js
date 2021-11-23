import * as React from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, FormControl, InputLabel, NativeSelect, TextField } from "@mui/material";
import app from "../../../config/axiosConfig";

export default class NewWidgetSettingsDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            data: {}
        }
        this.onClose = this.onClose.bind(this);
        this.showParametersFields = this.showParametersFields.bind(this);
        this.onCreateWidget = this.onCreateWidget.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps === this.props)
            return;
        if (this.props.open !== prevState.open) {
            this.setState({open: this.props.open});
        }
    }

    onClose = () => {
        this.props.close();
    }

    showParametersFields = () => {
        if (this.props.widget.params === undefined)
            return;
        return this.props.widget.params.map((param, index) => {
            if (param.type === 'string') {
                return (<TextField onChange={(event) => {
                    let data = this.state.data;
                    data[param.name] = event.target.value;
                    this.setState({data: data});
                }} id={param.name} label={param.name} key={index} variant="outlined"/>)
            } else if (param.type === 'list') {
                const menuItems = param.list.map((list) => <option value={list[1]}>{list[0]}</option>)
                let value = param.listValue;
                return (
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">{param.listLabel}</InputLabel>
                        <NativeSelect
                          defaultValue={30}
                          inputProps={{
                            name: {value},
                            id: 'uncontrolled-native',
                          }}
                        >
                        {menuItems}
                        </NativeSelect>
                      </FormControl>
                    </Box>
                  );
            }
            return (<div></div>);
        });
    };

    onCreateWidget = (event) => {
        event.preventDefault();
        app.patch('/widgets/config', {widget: this.props.widget.name, data: this.state.data, number: this.props.number}).then((response) => {
            app.post('/widgets/', {widget: this.props.widget.name, number: this.props.number}).then((response) => {
                this.props.onNewWidgetCreated(this.props.widget);
            }).catch((err) => {
                console.log("1. Error occurred", err);
            });
        }).catch((err) => {
            console.log("2. Error occurred", err);
        });
    }

    render() {
        return (<Dialog
            fullWidth={true}
            maxWidth={"lg"}
            open={this.state.open}
            onClose={this.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogContent>
                <h1>{this.props.widget.displayName}</h1>
                <br />
                <Box component="form" onSubmit={this.onCreateWidget} noValidate sx={{ mt: 1 }}>
                    {this.showParametersFields()}
                    <br />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }} >
                        Create
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.onClose} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>)
    }

}