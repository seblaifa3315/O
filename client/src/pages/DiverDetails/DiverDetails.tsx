import { useState, useEffect } from "react";
import useStyles from "./useStyles";
import { useParams, useNavigate } from "react-router-dom";
import { DiversApiData } from "../../interface/DiversApiData";
import getTheDiver from "../../helpers/APICalls/getTheDiver";
import deleteDiver from "../../helpers/APICalls/deleteDiver";
import { Box, Grid, CircularProgress, Stack } from "@mui/material";
import { useAuth } from "../../context/useAuthContext";

import PageContainer from "../../components/PageContainer/PageContainer";
import DiverAdminInfo from "./DiverAdminInfo/DiverAdminInfo";
import DiverPersoInfo from "./DiverPersoInfo/DiverPersoInfo";
import DiverTracks from "./DiverTracks/DiverTracks";

export default function DiverDetails() {
    const classes = useStyles();
    const [theDiver, setTheDiver] = useState<DiversApiData>();
    const { diverId } = useParams<{ diverId: string | undefined }>();
    const navigate = useNavigate();
    const { loggedInUser, profile } = useAuth();
    // const [openDialog, setOpenDialog] = useState(false);

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

    if (theDiver === undefined) {
        return <CircularProgress />;
    }
    if (!loggedInUser) {
        return <CircularProgress />;
    }
    if (!theDiver) {
        navigate("/divers");
        return <CircularProgress />;
    }

    // const handleClickOpen = () => {
    //     setOpenDialog(true);
    // };

    // const handleCloseDialog = () => {
    //     setOpenDialog(false);
    // };

    // const handleDelete = () => {
    //     deleteDiver(theDiver.userId).then((data) => {
    //         if (data.error) {
    //             console.error({ error: data.error.message });
    //         } else if (data) {
    //             handleCloseDialog();
    //             navigate("/divers");
    //         } else {
    //             // should not get here from backend but this catch is for an unknown issue
    //             console.error({ data });
    //         }
    //     });
    // };

    return (
        <PageContainer>
            <Box sx={{overflow: 'scroll'}}>
                <Grid item container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DiverAdminInfo theDiver={theDiver} />
                    </Grid>
                    <Grid container item xs={12} md={6}>
                        <Stack spacing={2}>
                            <DiverTracks theDiver={theDiver} />
                            <DiverPersoInfo theDiver={theDiver} />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
}
