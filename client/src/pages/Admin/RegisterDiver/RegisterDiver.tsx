import { FormikHelpers } from "formik";
import { Grid } from "@mui/material";
import RegisterDiverForm from "./RegisterDiverForm/RegisterDiverForm";
import useStyles from "./useStyles";
import register from '../../../helpers/APICalls/register';
import { useAuth } from '../../../context/useAuthContext';
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";

export default function RegisterDiver() {
    const classes = useStyles();
    const { loggedInUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = ({ firstName, lastName, status, shift, hiringDate, isAdmin }: { firstName: string; lastName: string; status: string; shift: string; hiringDate: any; isAdmin: boolean }, { setSubmitting }: FormikHelpers<{ firstName: string; lastName: string; status: string; shift: string; hiringDate: any; isAdmin: boolean }>) => {
        register(firstName, lastName, status, shift, hiringDate, isAdmin).then((data) => {
            if (data.error) {
                console.error({ error: data.error.message });
                setSubmitting(false);
              } else if (data.success) {
                navigate("/divers");
              } else {
                // should not get here from backend but this catch is for an unknown issue
                console.error({ data });
                setSubmitting(false);
              }
        })
    };
    // const handleSubmit = ({ firstName, lastName, status, shift, hiringDate, isAdmin }: { firstName: string; lastName: string; status: string; shift: string; hiringDate: Date; isAdmin: boolean }, { setSubmitting }: FormikHelpers<{ firstName: string; lastName: string; status: string; shift: string; hiringDate: Date; isAdmin: boolean }>) => {
    //     alert(`${firstName}, ${lastName}, ${status}, ${shift}, ${hiringDate}, ${isAdmin}`);
    //     setSubmitting(false);
    // };


    return (
        <Grid container sx={{ height: "92vh" }}>
            <Grid item xs={4} md={3}>
                    <Sidebar />
            </Grid>
            <Grid item xs={8} md={9} className={classes.form}>
                <RegisterDiverForm handleSubmit={handleSubmit} />
            </Grid>
        </Grid>
    );
}
