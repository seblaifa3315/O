import { Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography, CircularProgress, MenuItem, InputLabel, Select, FormControl } from "@mui/material";
import useStyles from "./useStyles";

const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const days: Array<string> = [];
for (let i = 1; i <= 31; i++) {
    days.push(i.toString());
}

const years: Array<string> = [];
for (let currentYear = new Date().getFullYear(); currentYear > 1900; currentYear--) {
    years.push(currentYear.toString());
}

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

interface Props {
    handleSubmit: (
        {
            city,
            country,
            month,
            day,
            year,
            phone,
            email,
        }: {
            city: string;
            country: string;
            month: string;
            day: string;
            year: string;
            phone: string;
            email: string;
        },
        {
            setStatus,
            setSubmitting,
        }: FormikHelpers<{
            city: string;
            country: string;
            month: string;
            day: string;
            year: string;
            phone: string;
            email: string;
        }>
    ) => void;
}

export default function SignUpForm({ handleSubmit }: Props): JSX.Element {
    const classes = useStyles();
    return (
        <Formik
            initialValues={{
                city: "",
                country: "",
                month: "",
                day: "",
                year: "",
                phone: "",
                email: "",
            }}
            validationSchema={Yup.object().shape({
                city: Yup.string().max(40, "Name is too long"),
                country: Yup.string().max(40, "Name is too long"),
                month: Yup.string(),
                day: Yup.string(),
                year: Yup.string(),
                phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
                email: Yup.string().email(),
            })}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="h4">
                                    Update Info
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" sx={{ marginBottom: "-20px", fontWeight: '600'}}>From:</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="city" name="city" label="City or State" placeholder="City or State" autoComplete="city" value={values.city} onChange={handleChange} error={touched.city && Boolean(errors.city)} helperText={touched.city ? errors.city : ""} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="country" name="country" label="Country" placeholder="Country" autoComplete="country" value={values.country} onChange={handleChange} error={touched.country && Boolean(errors.country)} helperText={touched.country ? errors.country : ""} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1" sx={{ marginBottom: "-20px", fontWeight: '600'}}>Birthdate:</Typography>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="month">Month</InputLabel>
                                    <Select fullWidth labelId="month" id="month" name="month" label="Month" value={values.month} onChange={handleChange} error={touched.month && Boolean(errors.month)}>
                                        {months.map((month) => (
                                            <MenuItem key={month} value={month}>
                                                {month.charAt(0).toUpperCase() + month.slice(1)}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="day">Day</InputLabel>
                                    <Select fullWidth id="day" name="day" label="day" value={values.day} onChange={handleChange} error={touched.day && Boolean(errors.day)}>
                                        {days.map((day) => (
                                            <MenuItem key={day} value={day}>
                                                {day}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="year">Year</InputLabel>
                                    <Select fullWidth id="year" name="year" label="year" value={values.year} onChange={handleChange} error={touched.year && Boolean(errors.year)}>
                                        {years.map((year) => (
                                            <MenuItem key={year} value={year}>
                                                {year}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                            <Typography variant="body1" sx={{ marginBottom: "-20px", fontWeight: '600'}}>Contact:</Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="phone" name="phone" label="Phone Number" placeholder="Your Phone Number" autoComplete="phone" value={values.phone} onChange={handleChange} error={touched.phone && Boolean(errors.phone)} helperText={touched.phone ? errors.phone : ""} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField fullWidth id="email" name="email" label="Email" placeholder="Your Email" autoComplete="email" value={values.email} onChange={handleChange} error={touched.email && Boolean(errors.email)} helperText={touched.email ? errors.email : ""} />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth disableElevation sx={{ height: 40 }}>
                                    {isSubmitting ? <CircularProgress style={{ color: "white" }} /> : "Submit"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
            )}
        </Formik>
    );
}
