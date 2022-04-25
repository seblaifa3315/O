import { Formik, FormikHelpers, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Grid, Typography, CircularProgress, MenuItem, InputLabel, Select, FormControlLabel, Checkbox, Radio, FormLabel, RadioGroup, FormControl, FormGroup, Chip, Box } from "@mui/material";
import useStyles from "./useStyles";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker } from "formik-mui-lab";
import { CheckboxWithLabel } from "formik-material-ui";
import { ChipInput } from "material-ui-formik-components";
import { DiversApiData } from "../../../../interface/DiversApiData";

const tracksOptions = [
    { label: "L1", value: "L1" },
    { label: "R1", value: "R1" },
    { label: "L2", value: "L2" },
    { label: "R2", value: "R2" },
    { label: "CL", value: "CL" },
    { label: "CR", value: "CR" },
    { label: "FL", value: "FL" },
    { label: "FR", value: "FR" },
    { label: "D/S", value: "D/S" },
    { label: "Console", value: "Console" },
];

interface Props {
    theDiver: DiversApiData,
    handleSubmit: (
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
        }: {
            firstName: string;
            lastName: string;
            status: string;
            shift: string;
            hiringDate: Date;
            isAdmin: boolean;
            tracks: String[];
            divingCert: String[];
            gearCert: String[];
            medicalCert: String[];
            otherCert: String[];
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
            tracks: String[];
            divingCert: String[];
            gearCert:String[];
            medicalCert:String[];
            otherCert:String[];
            
        }>
    ) => void;
}

export default function UpdateDiver({ handleSubmit, theDiver }: Props): JSX.Element {
    const classes = useStyles();

    return (
        
        <Formik
            initialValues={{
                firstName: `${theDiver.firstName}`,
                lastName: `${theDiver.lastName}`,
                status: `${theDiver.status}`,
                shift: `${theDiver.shift}`,
                hiringDate: new Date(theDiver.hiringDate),
                isAdmin: theDiver.isAdmin,
                tracks: theDiver.tracks,
                divingCert: theDiver.divingCert,
                gearCert: theDiver.gearCert,
                medicalCert: theDiver.medicalCert,
                otherCert: theDiver.otherCert,
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().required("Name is required").max(40, "Name is too long"),
                lastName: Yup.string().required("Email is required").max(40, "Name is too long"),
                status: Yup.string().required("Status is required"),
                shift: Yup.string(),
                hiringDate: Yup.date().nullable(),
                isAdmin: Yup.boolean(),
                tracks: Yup.array(),
                divingCert: Yup.array(),
                gearCert: Yup.array(),
                medicalCert: Yup.array(),
                otherCert: Yup.array(),
            })}
            // onSubmit={handleSubmit}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography textAlign="center" variant="h4">
                                    Update Diver's Profile
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="firstName"
                                    name="firstName"
                                    label="Diver's First Name"
                                    placeholder="Diver's First Name"
                                    autoComplete="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    error={touched.firstName && Boolean(errors.firstName)}
                                    helperText={touched.firstName ? errors.firstName : ""}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    name="lastName"
                                    label="Diver's Last Name"
                                    placeholder="Diver's Last Name"
                                    autoComplete="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    error={touched.lastName && Boolean(errors.lastName)}
                                    helperText={touched.lastName ? errors.lastName : ""}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="status">Status</InputLabel>
                                    <Select fullWidth id="status" name="status" label="Status" value={values.status} onChange={handleChange} error={touched.status && Boolean(errors.status)}>
                                        <MenuItem value="supervisor">Supervisor</MenuItem>
                                        <MenuItem value="lead">Lead</MenuItem>
                                        <MenuItem value="technician">Technician</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel control={<Checkbox checked={values.isAdmin} />} label="Administrator" name="isAdmin" onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <InputLabel id="shift">Shift</InputLabel>
                                <RadioGroup row aria-labelledby="shift" name="shift" value={values.shift} onChange={handleChange}>
                                    <FormControlLabel value="day" control={<Radio />} label="Day" />
                                    <FormControlLabel value="night" control={<Radio />} label="Show" />
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Field component={DatePicker} name="hiringDate" label="Hiring Date" />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Tracks</FormLabel>
                                    <FormGroup row>
                                        {tracksOptions.map((track) => (
                                            <Grid key={track.value} item xs={6} md={2.4}>
                                                <Field type="checkbox" component={CheckboxWithLabel} name="tracks" key={track.value} value={track.value} Label={{ label: track.label }} />
                                            </Grid>
                                        ))}
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Field name={`divingCert`} component={ChipInput} label="Scuba Diving Certifications" required={false} />
                            </Grid>
                            <Grid item xs={12}>
                                <Field name={`gearCert`} component={ChipInput} label="Gear Certifications" required={false} />
                            </Grid>
                            <Grid item xs={12}>
                                <Field name={`medicalCert`} component={ChipInput} label="Medical Certifications" required={false} />
                            </Grid>
                            <Grid item xs={12}>
                                <Field name={`otherCert`} component={ChipInput} label="Others Certifications" required={false} />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth disableElevation sx={{ height: 40 }}>
                                    {isSubmitting ? <CircularProgress style={{ color: "white" }} /> : "Submit"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </LocalizationProvider>
            )}
        </Formik>
    );
}
