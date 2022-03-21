import { FormikHelpers } from "formik";
import { Grid } from "@mui/material";
import RegisterDiverForm from "./RegisterDiverForm/RegisterDiverForm";
import useStyles from "./useStyles";
import register from '../../../helpers/APICalls/register';
import { useAuth } from '../../../context/useAuthContext';
import { useNavigate, useLocation } from "react-router-dom";

export default function RegisterDiver() {
    const classes = useStyles();
    const { loggedInUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = ({ firstName, lastName }: { firstName: string; lastName: string }, { setSubmitting }: FormikHelpers<{ firstName: string; lastName: string }>) => {
        register(firstName, lastName).then((data) => {
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
        })
    };

    return (
        <Grid container className={classes.container}>
            <Grid item xs={12} order={{ xs: 2, md: 1 }} className={classes.form}>
                <RegisterDiverForm handleSubmit={handleSubmit} />
            </Grid>
        </Grid>
    );
}
