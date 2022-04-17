import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { FormikHelpers } from "formik";
import { Grid, Box, CircularProgress, Paper } from "@mui/material";
import UpdateDiverForm from "./UpdateDiverForm/UpdateDiverForm";
import useStyles from "./useStyles";
import { useAuth } from "../../../context/useAuthContext";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { DiversApiData } from "../../../interface/DiversApiData";
import getTheDiver from "../../../helpers/APICalls/getTheDiver";
import updateDiver from "../../../helpers/APICalls/updateDiver";
import PageContainer from "../../../components/PageContainer/PageContainer";

export default function RegisterDiver() {
    const classes = useStyles();
    const { loggedInUser } = useAuth();
    const navigate = useNavigate();
    const [theDiver, setTheDiver] = useState<DiversApiData>();
    const { diverId } = useParams<{ diverId: string | undefined }>();

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

    const handleSubmit = (
        {
            firstName,
            lastName,
            status,
            shift,
            hiringDate,
            isAdmin,
            tracks,
            divingCert,
            gearCert,
            medicalCert,
            otherCert,
        }: { firstName: string; lastName: string; status: string; shift: string; hiringDate: Date; isAdmin: boolean; tracks: String[]; divingCert: String[]; gearCert: String[]; medicalCert: String[]; otherCert: String[] },
        { setSubmitting }: FormikHelpers<{ firstName: string; lastName: string; status: string; shift: string; hiringDate: Date; isAdmin: boolean; tracks: String[]; divingCert: String[]; gearCert: String[]; medicalCert: String[]; otherCert: String[] }>
    ) => {
        updateDiver(firstName, lastName, status, shift, hiringDate, isAdmin, tracks, divingCert, gearCert, medicalCert, otherCert, theDiver.userId).then((data) => {
            if (data.error) {
                console.error({ error: data.error.message });
                setSubmitting(false);
            } else if (data) {
                loggedInUser && navigate(`/diver-details/${diverId}`);
            } else {
                // should not get here from backend but this catch is for an unknown issue
                console.error({ data });
                setSubmitting(false);
            }
        });
    };

    return (
        <PageContainer>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{padding:'30px 0' }}>
                <Paper elevation={4} sx={{ opacity: 0.95, width: "90%", padding: "3% 5%" }}>
                    <UpdateDiverForm handleSubmit={handleSubmit} theDiver={theDiver} />
                </Paper>
            </Box>
        </PageContainer>
    );
}
