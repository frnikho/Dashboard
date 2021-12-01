import React from "react";
import NewWidgetCard from "./NewWidgetCard";
import Grid from "@mui/material/Grid";

export default class NewWidgetService extends React.Component {

    constructor(props) {
        super(props);
        this.showWidgets = this.showWidgets.bind(this);
        this.onClickNewWidget = this.onClickNewWidget.bind(this);
    }

    componentDidMount() {

    }

    onClickNewWidget(widget) {
        this.props.onClick(widget);
    }

    showWidgets = () => {
        return (this.props.service.widgets.map((widget, index) => {
            return (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <NewWidgetCard widget={widget} onClick={this.onClickNewWidget}/>
                </Grid>
            );
        }));
    }

    render() {
        return (<div>
            <h1>
                {this.props.service.name} <img src={process.env.REACT_APP_API_URL + this.props.service.imageLink} alt={"icon"} height={32}/>
            </h1>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {this.showWidgets()}
            </Grid>
        </div>);
    }

}