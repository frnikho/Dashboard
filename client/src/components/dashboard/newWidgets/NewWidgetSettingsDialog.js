import * as React from "react";
import {
    Box,
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl, FormControlLabel,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import app, {config} from "../../../config/axiosConfig";
import {BsClock} from "react-icons/all";
import {TokenContext} from "../../../context/TokenContext";
import SpotifyOauthPopup from "../../services/SpotifyOauthPopup";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";

import AdapterDateFns from '@mui/lab/AdapterDateFns';

export default class NewWidgetSettingsDialog extends React.Component {

    static contextType = TokenContext;

    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            data: {},
            isValid: false,
            timer: 30
        }
        this.onClose = this.onClose.bind(this);
        this.showParametersFields = this.showParametersFields.bind(this);
        this.onCreateWidget = this.onCreateWidget.bind(this);
    }

    componentDidMount() {
        this.token = this.context;
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

    handleChange(event, name) {
        let data = this.state.data;
        data[name] = event.target.value;
        if (!event.target.value) {
            this.setState({data: data, isValid: false});
        } else {
            this.setState({data: data, isValid: true});
        }
    }

    handleChangeDatePicker(value, name) {
        let data = this.state.data;
        data[name] = value;
        if (!value) {
            this.setState({data: data, isValid: false});
        } else {
            this.setState({data: data, isValid: true});
        }
    }

    handleSpotifyLogin = (data) => {
        this.setState({isValid: true});
    }

    onErrorSpotifyLogin = (error) => {
        this.setState({isValid: false});
    }


    showParametersFields = () => {

        if (this.props.widget.params === undefined)
            return;

        if (this.state.isValid === false && this.props.widget.params.length === 0)
            this.setState({isValid: true});

        return this.props.widget.params.map((param, index) => {
            if (param.type === 'string') {
                return (<TextField onChange={(event) => this.handleChange(event, param.name)} id={param.name} label={param.name} key={index} variant="outlined"/>)
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
                          onChange={(event) => this.handleChange(event, param.name)}
                        >
                        {menuItems}
                        </Select>
                      </FormControl>
                    </Box>
                  );
            } else if (param.type === "oauth2") {
                if (param.service === 'spotify') {
                    return (
                        <Box sx={{ m:2 }} key={index}>
                            <SpotifyOauthPopup handleLogin={this.handleSpotifyLogin} errorLogin={this.onErrorSpotifyLogin}/>
                        </Box>
                    )
                }
            } else if (param.type === "checkbox") {
                return (
                    <Box sx={{ m:2}} key={index}>
                        <FormControlLabel control={<Checkbox />} label={param.name} />
                    </Box>
                )
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
            return (<div key={index}/>);
        });
    };

    showTimer = () => {
        if (this.props.widget === undefined)
            return;

        let timer = this.props.widget.timer || {
            min: 30,
            max: 3600,
        };

        return (
            <Box sx={{py: 4}}>
                <TextField
                    id="input-with-icon-textfield"
                    label="Refresh rate"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BsClock/>
                            </InputAdornment>
                        ),
                    }}
                    defaultValue={timer.min}
                    onChange={(event) => {
                        if (event.target.value < timer.min)
                            event.target.value = timer.min;
                        if (event.target.value > timer.max)
                            event.target.value = timer.max;
                        this.setState({timer: parseInt(event.target.value)});
                    }}
                    type="number"
                    variant="outlined"/>
            </Box>
        )

    }

    onCreateWidget = (event) => {
        event.preventDefault();
        app.patch('/widgets/config', {widget: this.props.widget.name, data: this.state.data, number: this.props.number, timer: this.state.timer}, config(this.token)).then((response) => {
            app.post('/widgets/', {widget: this.props.widget.name, number: this.props.number}, config(this.token)).then((response) => {
                this.props.onNewWidgetCreated(this.props.widget);
            }).catch((err) => {

            });
        }).catch((err) => {
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
                    {this.showTimer()}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 1, mb: 2 }} disabled={!this.state.isValid}>
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