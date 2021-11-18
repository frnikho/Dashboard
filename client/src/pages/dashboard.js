import Grid from "@mui/material/Grid";
import NewWidgetComponent from "../components/NewWidgetComponent";
import {Box} from "@mui/material";
import WidgetComponent from "../components/WidgetComponent";

export default function DashboardPage() {
    return (
        <div>
            <Box sx={{my: 5}}>
                <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <NewWidgetComponent/>
                    <WidgetComponent/>
                </Grid>
            </Box>
        </div>);
}