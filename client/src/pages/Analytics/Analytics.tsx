import useStyles from "./useStyles";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useAuth } from "../../context/useAuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function Analytics() {
    const classes = useStyles();
    const { loggedInUser, profile } = useAuth();

    return (
        <PageContainer>
            <Grid container sx={{ height: '92vh'}}>
                <Grid item xs={4} md={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={8} md={9}>
                    Cue Tracks Statistics
                </Grid>
            </Grid>
        </PageContainer>
    );
}





{/* {loggedInUser && loggedInUser.isAdmin && (
                    <>
                        <Link to="/admin">
                            <Button variant="contained">Go to admin</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="contained">Go to register</Button>
                        </Link>
                    </>
                )} */}