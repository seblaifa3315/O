import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography, CircularProgress } from "@mui/material";
import useStyles from "./useStyles";
import { Link } from 'react-router-dom';

interface Props {
    handleSubmit: (
        {
            email,
            password,
        }: {
            email: string;
            password: string;
        },
        {
            setStatus,
            setSubmitting,
        }: FormikHelpers<{
            email: string;
            password: string;
        }>
    ) => void;
}

export default function LoginForm({ handleSubmit }: Props): JSX.Element {
    const classes = useStyles();
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().required("Email is required").email("Email is not valid"),
                password: Yup.string().required("Password is required").max(100, "Password is too long").min(6, "Password too short"),
            })}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} spacing={3}>
                            <Typography textAlign="center" variant="h4">
                                Log in
                            </Typography>
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
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth disableElevation sx={{ height: 40 }}>
                                {isSubmitting ? <CircularProgress style={{ color: "white" }} /> : "Login"}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex',  justifyContent: 'center'}}>
                            <Typography textAlign="center" variant="body1">
                                Not a member?
                            </Typography>
                            <Link to="/signup" className = "link">
                            <Typography textAlign="center" variant="body1" sx={{ fontWeight: 'bold', color: '#214fc6', marginLeft: '5px'}}>
                                Sign up
                            </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}
