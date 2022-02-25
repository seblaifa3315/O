import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography } from "@mui/material";
import useStyles from "./useStyles";

interface Props {
    handleSubmit: (
        {
            name,
            email,
            password,
        }: {
            email: string;
            password: string;
            name: string;
        },
        {
            setStatus,
            setSubmitting,
        }: FormikHelpers<{
            email: string;
            password: string;
            name: string;
        }>
    ) => void;
}

export default function SignUpForm({ handleSubmit }: Props): JSX.Element {
    const classes = useStyles();
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                name: "",
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().required("Name is required").max(40, "Name is too long"),
                email: Yup.string().required("Email is required").email("Email is not valid"),
                password: Yup.string().required("Password is required").max(100, "Password is too long").min(6, "Password too short"),
            })}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} spacing={3}>
                            <Typography textAlign='center' variant="h4">Create an account</Typography>
                        </Grid>
                        <Grid item xs={12} spacing={3}>
                            <TextField fullWidth id="name" name="name" label="Name" placeholder="Your Name" autoComplete="name" value={values.name} onChange={handleChange} error={touched.name && Boolean(errors.name)} helperText={touched.name ? errors.name : ""} />
                        </Grid>
                        <Grid item xs={12} spacing={3}>
                            <TextField fullWidth id="email" name="email" label="Email address" placeholder="Your email" autoComplete="email" value={values.email} onChange={handleChange} error={touched.email && Boolean(errors.email)} helperText={touched.email ? errors.email : ""} />
                        </Grid>
                        <Grid item xs={12} spacing={3}>
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Create a password"
                                autoComplete="current-password"
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password ? errors.password : ""}
                            />
                        </Grid>
                        <Grid item xs={12} spacing={3}>
                            <Button variant="contained" fullWidth type="submit" sx={{ height: 50 }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}
