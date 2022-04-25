import { FormikHelpers } from "formik";
import { Grid, Box, Paper } from "@mui/material";
import UpdateProfileForm from "./UpdateProfileForm/UpdateProfileForm";
import useStyles from "./useStyles";
import { useAuth } from "../../context/useAuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import updateProfile from "../../helpers/APICalls/updateProfile";
import PageContainer from "../../components/PageContainer/PageContainer";

export default function UpdateProfile() {
    const classes = useStyles();
    const { loggedInUser, profile } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (
        { city, country, month, day, year, phone, email }: { city: string; country: string; month: string; day: string; year: string; phone: string; email: string },
        { setSubmitting }: FormikHelpers<{ city: string; country: string; month: string; day: string; year: string; phone: string; email: string }>
    ) => {
        updateProfile(city, country, month, day, year, phone, email).then((data) => {
            if (data.error) {
                console.error({ error: data.error.message });
                setSubmitting(false);
            } else if (data) {
                loggedInUser && navigate(`/diver-details/${loggedInUser.id}`);
            } else {
                // should not get here from backend but this catch is for an unknown issue
                console.error({ data });
                setSubmitting(false);
            }
        });
    };

    return (
        <PageContainer>
            <Box display='flex' alignItems='center' justifyContent= 'center'>
            <Paper elevation={2} sx={{ opacity: 0.95, width: "90%", maxWidth: "600px", padding: "5% 5%" }}>
                    <UpdateProfileForm handleSubmit={handleSubmit} profile={profile} />
                </Paper>
            </Box>
        </PageContainer>
    );
}
