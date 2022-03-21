import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography, CircularProgress } from "@mui/material";
import useStyles from "./useStyles";
import { Link } from "react-router-dom";

interface Props {
    handleSubmit: (
        {
            firstName,
            lastName,
        }: {
            firstName: string;
            lastName: string;
        },
        {
            setStatus,
            setSubmitting,
        }: FormikHelpers<{
            firstName: string;
            lastName: string;
        }>
    ) => void;
}

export default function SignUpForm({ handleSubmit }: Props): JSX.Element {
    const classes = useStyles();
    return (
        <Formik
            initialValues={{
                firstName: "",
                lastName: "",
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required("Name is required").max(40, "Name is too long"),
                lastName: Yup.string().required("Email is required").max(40, "Name is too long"),
            })}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography textAlign="center" variant="h4">
                                Add a New Diver
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="firstName"
                                name="firstName"
                                label="Diver First Name"
                                placeholder="Diver First Name"
                                autoComplete="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                error={touched.firstName && Boolean(errors.firstName)}
                                helperText={touched.firstName ? errors.firstName : ""}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth id="lastName" name="lastName" label="Diver Last Name" placeholder="Diver Last Name" autoComplete="lastName" value={values.lastName} onChange={handleChange} error={touched.lastName && Boolean(errors.lastName)} helperText={touched.lastName ? errors.lastName : ""} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth disableElevation sx={{ height: 40 }}>
                                {isSubmitting ? <CircularProgress style={{ color: "white" }} /> : "Add"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}
