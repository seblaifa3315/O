import useStyles from "./useStyles";
import { Box, Grid } from "@mui/material";
import PageContainer from '../../components/PageContainer/PageContainer';

export default function Dashboard() {
    const classes = useStyles();

    return (
        <PageContainer>
            <Grid container>
                <h1>Ola</h1>
            </Grid>
        </PageContainer>
    );
}
