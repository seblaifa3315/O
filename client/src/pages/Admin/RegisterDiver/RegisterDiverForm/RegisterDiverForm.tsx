import { Formik, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography, CircularProgress, MenuItem, InputLabel, Select, FormControlLabel, Checkbox, Radio, FormLabel, RadioGroup, FormControl } from "@mui/material";
import useStyles from "./useStyles";
import { Link } from "react-router-dom";
import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {DatePicker} from 'formik-mui-lab';

interface Props {
    handleSubmit: (
        {
            firstName,
            lastName,
            status,
            shift,
            hiringDate,
            isAdmin,
        }: {
            firstName: string;
            lastName: string;
            status: string;
            shift: string;
            hiringDate: Date;
            isAdmin: boolean;
        },
        {
            setStatus,
            setSubmitting,
        }: FormikHelpers<{
            firstName: string;
            lastName: string;
            status: string;
            shift: string;
            hiringDate: Date;
            isAdmin: boolean;
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
                status: "",
                shift: "",
                hiringDate: new Date(),
                isAdmin: false,
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required("Name is required").max(40, "Name is too long"),
                lastName: Yup.string().required("Email is required").max(40, "Name is too long"),
                status: Yup.string().required("Status is required"),
                shift: Yup.string(),
                hiringDate: Yup.date().nullable(),
                isAdmin: Yup.boolean(),
            })}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                            <InputLabel id="status">Status</InputLabel>
                            <Select fullWidth id="status" name="status" label="Status" value={values.status} onChange={handleChange} error={touched.status && Boolean(errors.status)}>
                                <MenuItem value="supervisor">Supervisor</MenuItem>
                                <MenuItem value="lead">Lead</MenuItem>
                                <MenuItem value="technician">Technician</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel id="shift">Shift</InputLabel>
                            <RadioGroup row aria-labelledby="shift" name="shift" value={values.shift} onChange={handleChange}>
                                <FormControlLabel value="day" control={<Radio />} label="Day" />
                                <FormControlLabel value="night" control={<Radio />} label="Show" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <Field component={DatePicker} name="hiringDate" label="Hiring Date" />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={<Checkbox checked={values.isAdmin} />} label="Administrator" name="isAdmin" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth disableElevation sx={{ height: 40 }}>
                                {isSubmitting ? <CircularProgress style={{ color: "white" }} /> : "Add"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                </LocalizationProvider>
            )}
        </Formik>
    );
}
