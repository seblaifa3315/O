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

    return (
        <PageContainer>
            <Box sx={{ width: "95%", height: "95%" }}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    <Grid item xs={12} md={6}>
                        <DiverAdminInfo theDiver={theDiver} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={{ xs: 2, md: 3 }}>
                            <DiverTracks theDiver={theDiver} />
                            <DiverPersoInfo theDiver={theDiver} />
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
}
