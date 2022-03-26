import { useState, useEffect } from "react";
import useStyles from "./useStyles";
import { useParams, useNavigate } from "react-router-dom";
import { DiversApiData } from "../../interface/DiversApiData";
import getTheDiver from "../../helpers/APICalls/getTheDiver";
import { Box, Grid, Typography, Paper, Card, CardMedia, CardContent, Avatar, Rating, CircularProgress } from "@mui/material";
import PageContainer from "../../components/PageContainer/PageContainer";
import { useAuth } from "../../context/useAuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function DiverDetails() {
    const classes = useStyles();
    const [theDiver, setTheDiver] = useState<DiversApiData>();
    const { diverId } = useParams<{ diverId: string | undefined }>();
    const navigate = useNavigate();

    useEffect(() => {
        const loadTheDiver = async () => {
            getTheDiver(diverId).then((data: any) => {
                if (data.error) {
                    console.error({ error: data.error.message });
                } else if (data) {
                    setTheDiver(data);
                } else {
                    console.error({ data });
                }
            });
        };
        loadTheDiver();
    }, [diverId]);

    if (theDiver) {
        console.log("The Diver");
        console.log(theDiver);
    }

    if (theDiver === undefined) {
        return <CircularProgress />;
    }
    if (!theDiver) {
        navigate("/divers");
        return <CircularProgress />;
    }
    return (
        <PageContainer>
            <Grid container sx={{ height: "92vh" }}>
                <Grid item xs={4} md={3}>
                    <Sidebar />
                </Grid>
                <Grid item xs={8} md={9} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box className={classes.theDiverWrapper}>
                        <Card elevation={5} sx={{ minHeight: 600, minWidth: 600 }}>
                            <CardMedia component="img" height="200" image="https://img1.10bestmedia.com/Images/Photos/229823/p-home-bg_55_660x440_201404241116.jpg" alt="banner photo" />
                            <CardContent className={classes.diverInfoContainer}>
                                <Box className={classes.diverInfo}>
                                    <Avatar className={classes.avatar} alt="Profile Image" src={theDiver.photo} sx={{ width: 100, height: 100 }} />
                                    <Box className={classes.name}>
                                        <Typography variant="h6">
                                            {theDiver.firstName} {theDiver.lastName}
                                        </Typography>
                                        <Typography variant="caption">{theDiver.status}</Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </PageContainer>
    );
}
