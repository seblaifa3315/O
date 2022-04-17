import { FormikHelpers } from "formik";
import { Box, Paper } from "@mui/material";
import RegisterDiverForm from "./RegisterDiverForm/RegisterDiverForm";
import useStyles from "./useStyles";
import register from "../../../helpers/APICalls/register";
import { useAuth } from "../../../context/useAuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import PageContainer from "../../../components/PageContainer/PageContainer";

export default function RegisterDiver() {
    const classes = useStyles();
    const { loggedInUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (
        { firstName, lastName, status, shift, hiringDate, isAdmin }: { firstName: string; lastName: string; status: string; shift: string; hiringDate: Date; isAdmin: boolean },
        { setSubmitting }: FormikHelpers<{ firstName: string; lastName: string; status: string; shift: string; hiringDate: Date; isAdmin: boolean }>
    ) => {
        register(firstName, lastName, status, shift, hiringDate, isAdmin).then((data) => {
            if (data.error) {
                console.error({ error: data.error.message });
                setSubmitting(false);
            } else if (data.success) {
                navigate("/dashboard");
            } else {
                // should not get here from backend but this catch is for an unknown issue
                console.error({ data });
                setSubmitting(false);
            }
        });
    };

    return (
        <PageContainer>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
                <Paper elevation={4} sx={{ opacity: 0.95, width: "90%", maxWidth: "600px", padding: "5% 5%" }}>
                    <RegisterDiverForm handleSubmit={handleSubmit} />
                </Paper>
            </Box>
        </PageContainer>
    );
}
