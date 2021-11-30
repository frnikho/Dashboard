import * as React from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import app from "../../../config/axiosConfig";
import { BsClock } from "react-icons/all";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

export default class NewWidgetSettingsDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            data: {},
            timer: 30
        }
        this.onClose = this.onClose.bind(this);
        this.showParametersFields = this.showParametersFields.bind(this);
        this.onCreateWidget = this.onCreateWidget.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps === this.props)
            return;
        if (this.props.open !== prevState.open) {
            this.setState({ open: this.props.open });
        }
    }

    onClose = () => {
        this.props.close();
    }

    handleChangeList(event, name) {
        let data = this.state.data;
        data[name] = event.target.value;
        this.setState({ data: data });
    }

    handleChangeDatePicker(value, name) {
        let data = this.state.data;
        data[name] = value;
        this.setState({ data: data });
    }

    showParametersFields = () => {
        if (this.props.widget.params === undefined)
            return;
        return this.props.widget.params.map((param, index) => {
            if (param.type === 'string') {
                return (<TextField onChange={(event) => {
                    let data = this.state.data;
                    data[param.name] = event.target.value;
                    this.setState({ data: data });
                }} id={param.name} label={param.name} key={index} variant="outlined" />)
            } else if (param.type === 'list') {
                const menuItems = param.list.map((list, index) => <MenuItem key={index} value={list[0]}>{list[1]}</MenuItem>);
                return (
                    <Box sx={{ minWidth: 120 }} key={index}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">{param.listLabel}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.data[param.name] || ''}
                                label={param.listLabel}
                                onChange={(value) => this.handleChangeList(value, param.name)}
                            >
                                {menuItems}
                            </Select>
                        </FormControl>
                    </Box>
                );
            } else if (param.type === 'datepicker') {
                return (
                    <LocalizationProvider key={index} dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label={param.dateLabel}
                            inputFormat="MM/dd/yyyy"
                            value={this.state.data[param.name] || ''}
                            onChange={(event) => this.handleChangeDatePicker(event, param.name)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>);
            }
            return (<div></div>);
        });
    };

    onCreateWidget = (event) => {
        event.preventDefault();
        app.patch('/widgets/config', { widget: this.props.widget.name, data: this.state.data, number: this.props.number, timer: this.state.timer }).then((response) => {
            app.post('/widgets/', { widget: this.props.widget.name, number: this.props.number }).then((response) => {
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
                    <Box sx={{ py: 4 }}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Refresh rate"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BsClock />
                                    </InputAdornment>
                                ),
                            }}
                            defaultValue={this.state.timer}
                            onChange={(event) => {
                                if (event.target.value < 30)
                                    event.target.value = 30;
                                if (event.target.value > 3600)
                                    event.target.value = 3600;
                                this.setState({ timer: event.target.value });
                            }}
                            type="number"
                            variant="outlined" />
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }} >
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